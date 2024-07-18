import React, { useEffect, useState } from 'react';
import { Modal, message, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const Sources = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState({ title: '', category: '', images: null,  });
  const [previewImage, setPreviewImage] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const urlImg = 'https://api.dezinfeksiyatashkent.uz/api/uploads/images/';

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzkwYzBiNzktMWFkNy00NGM1LWE5ODMtMzUzMzMzNjZmOGU5IiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcyMDg1NTE5NywiZXhwIjoxNzUyMzkxMTk3fQ.yoE3F-EOggdKK5H2S6Gp-o3_4BTYK8z79m5skTkNUfs';

  const getSources = () => {
    setLoading(true);
    fetch('https://api.dezinfeksiyatashkent.uz/api/sources')
      .then((res) => res.json())
      .then((data) => {
        setSources(data.data);
        setLoading(false);
        console.log(data?.data);
      })
      .catch((error) => {
        console.error('Error fetching sources:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getSources();
  }, []);

  const handleEdit = (item) => {
    setId(item.id);
    setData({ title: item.title, category: item.category, images: item.source_images });
    setPreviewImage(`${urlImg}${item.source_images[0]?.image?.src}`);
    setOpenEditModal(true);
  };
  
  

  const handleAdd = () => {
    setData({ title: '', category:  '', images: null });
    setPreviewImage(null);
    setOpenAddModal(true);
  };

  const handleDelete = (id) => {
    fetch(`https://api.dezinfeksiyatashkent.uz/api/sources/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const newSources = sources.filter((source) => source.id !== id);
          setSources(newSources);
          message.success('Source deleted successfully.');
        } else {
          message.error('Failed to delete source.');
        }
        setOpenDeleteModal(false);
      })
      .catch((error) => {
        console.error('Error deleting source:', error);
        message.error('Failed to delete source.');
        setOpenDeleteModal(false);
      });
  };

  const addSource = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('category', data.category);
    if (data.images instanceof File) {
      formData.append('images', data.images);
    }

    fetch('https://api.dezinfeksiyatashkent.uz/api/sources', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          handleClose();
          setSources([...sources, res.data]);
          message.success('Source added successfully.');
        } else {
          message.error('Failed to add source.');
        }
      })
      .catch((error) => {
        console.error('Error adding source:', error);
        message.error('Failed to add source.');
      });
  };

  const editSource = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('category', data.category);
    if (data.images instanceof File) {
      formData.append('images', data.images);
    }

    fetch(`https://api.dezinfeksiyatashkent.uz/api/sources/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'PUT',
      body: formData
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          handleClose();
          getSources();
          message.success('Source updated successfully.');
        } else {
          message.error('Failed to update source.');
        }
      })
      .catch((error) => {
        console.error('Error updating source:', error);
        message.error('Failed to update source.');
      });
  };

  const handleClose = () => {
    setOpenEditModal(false);
    setOpenAddModal(false);
    setOpenDeleteModal(false);
  };

  const confirmDelete = (id) => {
    setId(id);
    setOpenDeleteModal(true);
  };

  const deleteSource = () => {
    handleDelete(id);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, images: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="sources">
      <div className="category-adds">
        <h1>Sources</h1>
        <Button
          type="primary"
          className="add-source-btn"
          onClick={handleAdd}
          icon={<PlusOutlined />}
        >
          Add
        </Button>
      </div>
      <table className="customers">
        <thead>
          <tr>
            <th>No</th>
            <th>Images</th>
            <th>Title</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6">
                <div className="spinner"></div>
              </td>
            </tr>
          ) : (
            sources.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                <img src={`${urlImg}${item.src}`} alt="1" />


                </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>
                  <Button
                    type="link"
                    className="edit"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="link"
                    className="delete"
                    icon={<DeleteOutlined />}
                    onClick={() => confirmDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Modal title="Edit Source" visible={openEditModal} onCancel={handleClose} footer={null}>
        <form onSubmit={editSource}>
          <label>Title:</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <label>Category</label>
          <input
            type="text"
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
          />
          
          <label>Existing Image:</label>
          {previewImage && (
            <img
              src={previewImage}
              alt="Existing"
              style={{ width: '100px', marginBottom: '10px' }}
            />
          )}
          <label>New Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
          <div className="modal-buttons">
            <button type="button" className="cancel_btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="save_btn">
              Update
            </button>
          </div>
        </form>
      </Modal>

      <Modal title="Add Source" visible={openAddModal} onCancel={handleClose} footer={null}>
        <form onSubmit={addSource}>
          <label>Title:</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <label>Category:</label>
          <input
            type="text"
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
          />
          
          <label>Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
          <div className="modal-buttons">
            <button type="button" className="cancel_btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="save_btn">
              Add
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        title="Delete Source"
        visible={openDeleteModal}
        onCancel={handleClose}
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={deleteSource}>
            Delete
          </Button>
        ]}
      >
        <p>Are you sure you want to delete this source?</p>
      </Modal>
    </div>
  );
};

export default Sources;
