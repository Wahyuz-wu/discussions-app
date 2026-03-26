import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { asyncAddThread } from '../states/threads/action';
import { Helmet } from 'react-helmet-async';

function CreateThreadPage() {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreateThread = async (event) => {
    event.preventDefault();

    const result = await dispatch(asyncAddThread({
      title,
      body,
      category: category || ''
    }));

    if (result) {
      navigate('/');
    }
  };

  return (
    <section className="create-thread-page">
      <Helmet>
        <title>New - Discussions Forum</title>
      </Helmet>
      <h2>Buat Diskusi Baru</h2>
      <form onSubmit={onCreateThread}>
        <input type="text" placeholder="Judul" value={title} onChange={onTitleChange} required />
        <input type="text" placeholder="Kategori" value={category} onChange={onCategoryChange} />
        <textarea placeholder="Isi diskusi..." value={body} onChange={onBodyChange} required />
        <button type="submit">Buat Thread</button>
      </form>
    </section>
  );
}

export default CreateThreadPage;