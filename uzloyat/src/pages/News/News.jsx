import React, { useEffect, useState } from 'react';
import { Modal, message, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState({ title_uz: '', text_uz: '', images: null, author: '' });
  const [previewImage, setPreviewImage] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const urlImg = 'https://api.dezinfeksiyatashkent.uz/api/uploads/images/';

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzkwYzBiNzktMWFkNy00NGM1LWE5ODMtMzUzMzMzNjZmOGU5IiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcyMDg1NTE5NywiZXhwIjoxNzUyMzkxMTk3fQ.yoE3F-EOggdKK5H2S6Gp-o3_4BTYK8z79m5skTkNUfs';

  const getNews = () => {
    setLoading(true);
    fetch('https://api.dezinfeksiyatashkent.uz/api/news/')
      .then((res) => res.json())
      .then((data) => {
        setNews(data.data);
        setLoading(false);
        // console.log(data.data);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  const handleEdit = (item) => {
    setId(item.id);
    setData({ title_uz: item.title_uz, text_uz: item.text_uz, images: item.news_images, author: item.author });
    setPreviewImage(`${urlImg}${item.news_images[0]?.image?.src}`);
    setOpenEditModal(true);
  };

  const handleAdd = () => {
    setData({ title_uz: '', text_uz: '', author: '', images: null });
    setPreviewImage(null);
    setOpenAddModal(true);
  };

  const handleDelete = (id) => {
    fetch(`https://api.dezinfeksiyatashkent.uz/api/news/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const newNews = news.filter((item) => item.id !== id);
          setNews(newNews);
          message.success('News deleted successfully.');
        } else {
          message.error('Failed to delete news.');
        }
        setOpenDeleteModal(false);
      })
      .catch((error) => {
        console.error('Error deleting news:', error);
        message.error('Failed to delete news.');
        setOpenDeleteModal(false);
      });
  };

  const addNews = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title_uz', data.title_uz);
    formData.append('text_uz', data.text_uz);
    formData.append('author', data.author);
    if (data.images instanceof File) {
      formData.append('images', data.images);
    }

    fetch('https://api.dezinfeksiyatashkent.uz/api/news', {
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
          setNews([...news, res.data]);
          message.success('News added successfully.');
        } else {
          message.error('Failed to add news.');
        }
      })
      .catch((error) => {
        console.error('Error adding news:', error);
        message.error('Failed to add news.');
      });
  };

  const editNews = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title_uz', data.title_uz);
    formData.append('text_uz', data.text_uz);
    formData.append('author', data.author);
    if (data.images instanceof File) {
      formData.append('images', data.images);
    }

    fetch(`https://api.dezinfeksiyatashkent.uz/api/news/${id}`, {
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
          getNews();
          message.success('News updated successfully.');
        } else {
          message.error('Failed to update news.');
        }
      })
      .catch((error) => {
        console.error('Error updating news:', error);
        message.error('Failed to update news.');
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

  const deleteNews = () => {
    handleDelete(id);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, images: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="category">
      <div className="category-adds">
        <h1>News</h1>
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
              <td colSpan="6">
                <div className="spinner"></div>
              </td>
            </tr>
          ) : (
            news.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${urlImg}${item.news_images[0]?.image?.src}`}
                    alt="news"
                    style={{ width: '100px' }}
                  />
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

      <Modal title="Edit News" visible={openEditModal} onCancel={handleClose} footer={null}>
        <form onSubmit={editNews}>
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

      <Modal title="Add News" visible={openAddModal} onCancel={handleClose} footer={null}>
        <form onSubmit={addNews}>
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
        title="Delete News"
        visible={openDeleteModal}
        onCancel={handleClose}
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={deleteNews}>
            Delete
          </Button>
        ]}
      >
        <p>Are you sure you want to delete this news?</p>
      </Modal>
    </div>
  );
};

export default News;
