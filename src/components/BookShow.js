
function BookShow({ book, onDelete }) {
  const handleClick = () => {
    onDelete(book);
  };

  return (
    <div className="book-show">

    <div>{book}</div>
      
      <div className="actions">
        <button className="delete" onClick={handleClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookShow;
