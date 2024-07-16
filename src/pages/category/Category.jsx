import React, { useEffect, useState } from 'react';
import { Modal, message, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './Category.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState({ name: '', description: '' });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzkwYzBiNzktMWFkNy00NGM1LWE5ODMtMzUzMzMzNjZmOGU5IiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcyMDg1NTE5NywiZXhwIjoxNzUyMzkxMTk3fQ.yoE3F-EOggdKK5H2S6Gp-o3_4BTYK8z79m5skTkNUfs';

  const getCategory = () => {
    setLoading(true);
    fetch('https://api.dezinfeksiyatashkent.uz/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleEdit = (item) => {
    setId(item.id);
    setData({ name: item.name, description: item.description });
    setOpenEditModal(true);
  };

  const handleAdd = () => {
    setData({ name: '', description: '' });
    setOpenAddModal(true);
  };

  const handleDelete = (id) => {
    fetch(`https://api.dezinfeksiyatashkent.uz/api/categories/${id}`, {
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
          message.success('Category deleted successfully.');
        } else {
          message.error('Failed to delete category.');
        }
        setOpenDeleteModal(false);
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
        message.error('Failed to delete category.');
        setOpenDeleteModal(false);
      });
  };

  const addCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);

    fetch('https://api.dezinfeksiyatashkent.uz/api/categories', {
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
          message.success('Category added successfully.');
        } else {
          message.error('Failed to add category.');
        }
      })
      .catch((error) => {
        console.error('Error adding category:', error);
        message.error('Failed to add category.');
      });
  };

  const editCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);

    fetch(`https://api.dezinfeksiyatashkent.uz/api/categories/${id}`, {
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
          message.success('Category updated successfully.');
        } else {
          message.error('Failed to update category.');
        }
      })
      .catch((error) => {
        console.error('Error updating category:', error);
        message.error('Failed to update category.');
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
        <h1>Categories</h1>
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
            <th className='table_th'>Name</th>
            <th className='table_th'>Description</th>
            <th className='table_th'>Actions</th>
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
                <td>{item.name}</td>
                <td>{item.description}</td>
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

      <Modal title="Edit Category" visible={openEditModal} onCancel={handleClose} footer={null}>
        <form onSubmit={editCategory}>
          <label>Name:</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <label>Description:</label>
          <input
            type="text"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
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

      <Modal title="Add Category" visible={openAddModal} onCancel={handleClose} footer={null}>
        <form onSubmit={addCategory}>
          <label>Name:</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <label>Description:</label>
          <input
            type="text"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
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
        title="Delete Category"
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
