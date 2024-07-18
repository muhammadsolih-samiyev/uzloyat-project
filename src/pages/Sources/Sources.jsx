import React, { useEffect, useState } from 'react';
import { Modal, message, Button, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const Sources = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [id, setId] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: '', images: null });
  const [previewImage, setPreviewImage] = useState(null);

  const token = 'YOUR_TOKEN_HERE';
  const urlImg = 'https://api.dezinfeksiyatashkent.uz/api/uploads/images/';

  const getSources = () => {
    setLoading(true);
    fetch('https://api.dezinfeksiyatashkent.uz/api/sources/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setSources(data.data);
        } else {
          setSources([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getSources();
  }, []);

  const handleEdit = (item) => {
    setId(item.id);
    setFormData({ title: item.title, category: item.category, images: item.image });
    setPreviewImage(`${urlImg}${item.image?.src}`);
    setOpenEditModal(true);
  };

  const handleAdd = () => {
    setFormData({ title: '', category: '', images: null });
    setPreviewImage(null);
    setOpenAddModal(true);
  };

  const handleDelete = (id) => {
    setId(id);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    setLoading(true);
    fetch(`https://api.dezinfeksiyatashkent.uz/api/sources/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setSources(sources.filter((item) => item.id !== id));
        setOpenDeleteModal(false);
        setLoading(false);
        message.success('Successfully deleted');
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        message.error('Failed to delete source');
      });
  };

  const handleCloseModals = () => {
    setOpenEditModal(false);
    setOpenAddModal(false);
    setOpenDeleteModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, images: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e, isEdit = false) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category', formData.category);
    if (formData.images) {
      formDataToSend.append('images', formData.images);
    }

    const url = isEdit
      ? `https://api.dezinfeksiyatashkent.uz/api/sources/${id}`
      : 'https://api.dezinfeksiyatashkent.uz/api/sources';
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: formDataToSend,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          message.success(`Successfully ${isEdit ? 'updated' : 'added'}`);
          getSources();
          handleCloseModals();
        } else {
          message.error('An error occurred');
        }
      })
      .catch((err) => {
        console.error(err);
        message.error('An error occurred');
      });
  };

  return (
    <div className="sources">
      <div className="category-adds">
        <h1>Sources</h1>
        <Button type="primary" className="add-source-btn" onClick={handleAdd} icon={<PlusOutlined />}>
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
                  <img
                    src={item.image ? `${urlImg}${item.image?.src}` : 'default-image-url'}
                    alt={item.title}
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>
                  <Button type="link" className="edit" icon={<EditOutlined />} onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button type="link" className="delete" icon={<DeleteOutlined />} onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Modal title="Edit Source" open={openEditModal} onCancel={handleCloseModals} footer={null}>
        <form onSubmit={(e) => handleSubmit(e, true)}>
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <label>Category:</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
          <input type="file" onChange={handleImageChange} accept="image/*" />
          <div className="modal-buttons">
            <button type="button" className="cancel_btn" onClick={handleCloseModals}>
              Cancel
            </button>
            <button type="submit" className="save_btn">
              Update
            </button>
          </div>
        </form>
      </Modal>

      <Modal title="Add Source" open={openAddModal} onCancel={handleCloseModals} footer={null}>
        <form onSubmit={(e) => handleSubmit(e, false)}>
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <label>Category:</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {previewImage && (
            <img src={previewImage} alt="New" style={{ width: '100px', marginBottom: '10px' }} />
          )}
          <div className="modal-buttons">
            <button type="button" className="cancel_btn" onClick={handleCloseModals}>
              Cancel
            </button>
            <button type="submit" className="save_btn">
              Save
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        title="Delete Source"
        open={openDeleteModal}
        onOk={confirmDelete}
        onCancel={handleCloseModals}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this source?</p>
      </Modal>
    </div>
  );
};

export default Sources;
