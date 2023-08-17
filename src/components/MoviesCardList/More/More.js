import './More.css';

function More({ handleMore, inVisible = false }) {

  return (
    <section className={`more ${inVisible ? 'more_small' : 'more_big'}`}>
      <button
        type='button'
        className={`more__btn ${inVisible && 'more__invisible'}`}
        onClick={handleMore}
      >
        Ещё
      </button>
    </section>
  );
};

export default More;
