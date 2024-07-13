import React, { useEffect, useState } from 'react';
import { Modal, message, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './Blogs.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState({ title_uz: '', text_uz: '', images: null, author: '' });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const urlImg = 'https://api.dezinfeksiyatashkent.uz/api/uploads/images';

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzkwYzBiNzktMWFkNy00NGM1LWE5ODMtMzUzMzMzNjZmOGU5IiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcyMDg1NTE5NywiZXhwIjoxNzUyMzkxMTk3fQ.yoE3F-EOggdKK5H2S6Gp-o3_4BTYK8z79m5skTkNUfs';

  const getCategory = () => {
    setLoading(true);
    fetch('https://api.dezinfeksiyatashkent.uz/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleEdit = (item) => {
    setId(item.id);
    setData({ title_uz: item.title_uz, text_uz: item.text_uz, images: item.images, author: item.author });
    setOpenEditModal(true);
  };

  const handleAdd = () => {
    setData({ title_uz: '', text_uz: '',  author: '', images: null });
    setOpenAddModal(true);
  };

  const handleDelete = (id) => {
    fetch(`https://api.dezinfeksiyatashkent.uz/api/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const newCategories = categories.filter((category) => category.id !== id);
          setCategories(newCategories);
          message.success('blogs deleted successfully.');
        } else {
          message.error('Failed to delete blogs.');
        }
        setOpenDeleteModal(false);
      })
      .catch((error) => {
        console.error('Error deleting blogs:', error);
        message.error('Failed to delete blogs.');
        setOpenDeleteModal(false);
      });
  };

  const addCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title_uz', data.title_uz);
    formData.append('text_uz', data.text_uz);
    formData.append('author', data.author);
    if (data.images instanceof File) {
      formData.append('images', data.images);
    }

    fetch('https://api.dezinfeksiyatashkent.uz/api/blogs', {
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
          setCategories([...categories, res.data]);
          message.success('blogs added successfully.');
        } else {
          message.error('Failed to add blogs.');
        }
      })
      .catch((error) => {
        console.error('Error adding blogs:', error);
        message.error('Failed to add blogs.');
      });
  };

  const editCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title_uz', data.title_uz);
    formData.append('text_uz', data.text_uz);
    formData.append('author', data.author);
    if (data.images instanceof File) {
      formData.append('images', data.images);
    }

    fetch(`https://api.dezinfeksiyatashkent.uz/api/blogs/${id}`, {
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
          getCategory();
          message.success('blogs updated successfully.');
        } else {
          message.error('Failed to update blogs.');
        }
      })
      .catch((error) => {
        console.error('Error updating blogs:', error);
        message.error('Failed to update blogs.');
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

  const deleteCategory = () => {
    handleDelete(id);
  };

  return (
    <div className="category">
      <div className="category-adds">
        <h1>Blogs</h1>
        <Button
          type="primary"
          className="add-category-btn"
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
            <th>Name Uz</th>
            <th>Text Uz</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">
                <div className="spinner"></div>
              </td>
            </tr>
          ) : (
            categories.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={`${urlImg}${item.images}`} alt={`Image`} />
                </td>
                <td>{item.title_uz}</td>
                <td>{item.text_uz}</td>
                <td>{item.author}</td>
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

      <Modal title="Edit Blog" visible={openEditModal} onCancel={handleClose} footer={null}>
        <form onSubmit={editCategory}>
          <label>Name Uz:</label>
          <input
            type="text"
            value={data.title_uz}
            onChange={(e) => setData({ ...data, title_uz: e.target.value })}
          />
          <label>Text Uz:</label>
          <input
            type="text"
            value={data.text_uz}
            onChange={(e) => setData({ ...data, text_uz: e.target.value })}
          />
          <label>Author:</label>
<input
  type="text"
  value={data.author}
  onChange={(e) => setData({ ...data, author: e.target.value })}
/>

          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setData({ ...data, images: e.target.files[0] })}
            accept="images/*"
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

      <Modal title="Add Blog" visible={openAddModal} onCancel={handleClose} footer={null}>
        <form onSubmit={addCategory}>
          <label>Name Uz:</label>
          <input
            type="text"
            value={data.title_uz}
            onChange={(e) => setData({ ...data, title_uz: e.target.value })}
          />
          <label>Text Uz:</label>
          <input
            type="text"
            value={data.text_uz}
            onChange={(e) => setData({ ...data, text_uz: e.target.value })}
          />
          <label>Author:</label>
          <input
            type="text"
            value={data.author}
            onChange={(e) => setData({ ...data, author: e.target.value })}
          />

          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setData({ ...data, images: e.target.files[0] })}
            accept="images/*"
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
        title="Delete Blog"
        visible={openDeleteModal}
        onCancel={handleClose}
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={deleteCategory}>
            Delete
          </Button>
        ]}
      >
        <p>Are you sure you want to delete this category?</p>
      </Modal>
    </div>
  );
};

export default Category;
