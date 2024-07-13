import React, { useEffect, useState } from 'react'
import { Modal, message, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { deleteFaqItem, getFaq, postFaq, updateFaq } from '../../api/FaqsAction';
function Faqs() {
  const [loading, setLoading] = useState(true);
  const [faqData, setFaqData] = useState([])
  const [addModal, setAddModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [data, setData] = useState({ title_en: '', title_ru: '', title_uz: '', text_en: '', text_ru: '', text_uz: ''});
  const [id, setId] = useState("")
  useEffect(()=> {
    getData()
    const lang = sessionStorage.getItem("lang")
    if (lang) {
      setLang(lang)
    }else {
      setLang("en")
    }
  },[])
  const getData = async() => {
    const faq = await getFaq()
    console.log(faq);
    setLoading(faq ? false : true)
    setFaqData(faq)
  }
  const editFaq = (item) => {
    setId(item?.id)
    setAddModal(true)
    setData({title_en: item?.title_en, title_ru: item?.title_ru, title_uz: item?.title_uz, text_en: item?.text_en, text_ru: item?.text_ru, text_uz: item?.text_uz,})
  }
  const deleteFaq = (id) => {
    setId(id)
    setDeleteModal(true)
  }
  const removeFaq = async() => {
    const res = await deleteFaqItem(id)
    if (res.success) {
      getData()
      handleClose()
    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title_en", data?.title_en)
    formData.append("title_ru", data?.title_ru)
    formData.append("title_uz", data?.title_uz)
    formData.append("text_en", data?.text_en)
    formData.append("text_ru", data?.text_ru)
    formData.append("text_uz", data?.text_uz)
    if (id) {
      const res = await updateFaq(id, formData)
      console.log(res);
      if (res?.success) {
        handleClose()
        getData()
        message.success(res?.message)
      }else {
        message.error(res?.response?.error?.status === 400 ? "Fields should not be empty" : "Error!")
      }
    }else {
      const res = await postFaq(formData)
      if (res?.success) {
        message.success(res?.message)
        handleClose()
        getData()
      }else {
        message.error(res?.response?.data?.error?.status === 400 ? "Fields should not be empty" : "Error!")
      }
    }
  }
  const handleClose = () => {
  setData({ title_en: '', title_ru: '', title_uz: '', text_en: '', text_ru: '', text_uz: ''});
  setAddModal(false)
  setDeleteModal(false)
  setId("")
  }
  const [lang, setLang] = useState("en")
  const changeLang = (e) => {
    setLang(e.target.value)
    sessionStorage.setItem("lang", e.target.value)
  }
  return (
    <div>
      <div className="category-adds">
        <h1>FAQ</h1>
        <Button
          type="primary"
          className="add-category-btn"
          icon={<PlusOutlined />}
          onClick={()=>setAddModal(true)}
        >
          Add
        </Button>
      </div>
      <table className="customers">
        <thead>
          <tr>
            <th>No</th>
            <th className='table_th'>Title</th>
            <th className='table_th'>Text</th>
            <th className='table_th'>Actions</th>
            <th className='table_th'>
              <select className='table_option' onChange={changeLang}>
                <option value={lang} hidden>{lang === "en" ? "English" : lang === "ru" ? "Russian" : "Uzbek"}</option>
                <option value="en">English</option>
                <option value="ru">Russian</option>
                <option value="uz">Uzbek</option>
              </select>
              </th>
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
            faqData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{lang === "en" ? item.title_en : lang === "ru" ? item.title_ru : item.title_uz}</td>
                <td>{lang === "en" ? item.text_en : lang === "ru" ? item.text_ru : item.text_uz}</td>
                <td>
                  <Button
                    type="link"
                    className="edit"
                    icon={<EditOutlined />}
                    onClick={() => editFaq(item)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                <Button
                    type="link"
                    className="delete"
                    icon={<DeleteOutlined />}
                    onClick={() => deleteFaq(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Modal title={id ? "Update FAQ" : "Add FAQ"} open={addModal} onCancel={handleClose} footer={null}>
        <form onSubmit={handleSubmit}>
          <label>Title in English:</label>
          <input
            type="text"
            value={data.title_en}
            onChange={(e) => setData({ ...data, title_en: e.target.value })}
          />
          <label>Title in Russian:</label>
          <input
            type="text"
            value={data.title_ru}
            onChange={(e) => setData({ ...data, title_ru: e.target.value })}
          />
          <label>Title in Uzbek:</label>
          <input
            type="text"
            value={data.title_uz}
            onChange={(e) => setData({ ...data, title_uz: e.target.value })}
          />
          <label>Text in English:</label>
          <input
            type="text"
            value={data.text_en}
            onChange={(e) => setData({ ...data, text_en: e.target.value })}
          />
          <label>Text in Russian:</label>
          <input
            type="text"
            value={data.text_ru}
            onChange={(e) => setData({ ...data, text_ru: e.target.value })}
          />
          <label>Text in Uzbek:</label>
          <input
            type="text"
            value={data.text_uz}
            onChange={(e) => setData({ ...data, text_uz: e.target.value })}
          />
          <div className="modal-buttons">
            <button type="button" className="cancel_btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="save_btn">
              Save
            </button>
          </div>
        </form>
      </Modal>
      <Modal title="Delete FAQ" open={deleteModal} onCancel={handleClose} footer={null}>
        <form onSubmit={handleSubmit}>
          <h1>Are you sure?</h1>
          <div className="modal-buttons">
          <Button key="cancel" onClick={removeFaq}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={removeFaq}>
            Delete
          </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Faqs