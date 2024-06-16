import React from 'react';

const Favorites = ({ favorites, onRemove, onSelectFavorite }) => {
  return (
    <div className="favorites card">
      <h2 className="card-header">Favorite Cities</h2>
      <div className="card-body">
        <ul className="list-group">
          {favorites.map((city) => (
            <li key={city.id} className="list-group-item">
              {city.name}
              <button className="btn btn-danger ms-2" onClick={() => onRemove(city.id)}>
                Remove
              </button>
              <button className="btn btn-info ms-2" onClick={() => onSelectFavorite(city.name)}>
                Select
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
