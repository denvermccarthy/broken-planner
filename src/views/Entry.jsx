import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEntries } from '../context/PlannerContext';

import styles from './Entry.css';

export default function Entry() {
  const [entry, setEntry] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const { entries, getEntry, deleteEntry, editEntry } = useEntries();

  useEffect(() => {
    setEntry(getEntry(id));
  }, [id, entries]);

  return (
    <>
      <Link to="/entries" className={styles.backButton}>
        &laquo; Back to Planner
      </Link>
      <article className={styles.entry}>
        {isEditing ? (
          <>
            <input
              defaultValue={entry?.title}
              onChange={(e) => editEntry({ ...entry, title: e.target.value })}
            />
            <input
              type="date"
              name="date"
              value={entry?.date || ''}
              onChange={(e) => editEntry({ ...entry, date: e.target.value })}
            />
            <textarea
              defaultValue={entry?.content}
              onChange={(e) => editEntry({ ...entry, content: e.target.value })}
            ></textarea>
            <p onClick={() => deleteEntry(id)}>🗑️</p>
            <button onClick={() => setIsEditing(false)}>save</button>
          </>
        ) : (
          <>
            <h1>{entry?.title}</h1>
            <p>Due: {entry?.date}</p>
            <p>{entry?.content}</p>
            <p onClick={() => deleteEntry(id)}>🗑️</p>
            <p onClick={() => setIsEditing(true)}>✏️</p>
          </>
        )}
      </article>
    </>
  );
}
