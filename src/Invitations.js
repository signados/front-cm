import React, { useState, useEffect } from 'react';
import Invitation from './Invitation';

function Invitations() {
  const [invitations, setInvitations] = useState([]);
  const [count, setCount] = useState(0);

  const [q, setQ] = useState("");
  const [searchParam] = useState(['nombre']);
  //const [filterParam, setFilterParam] = useState(["All"]);

  // https://www.freecodecamp.org/news/search-and-filter-component-in-reactjs/
  // Podría sacar los grupos de las invitaciones para el select
  /*
  useEffect(() => {
    console.log(`You clicked ${count} times`);
  }); // Todo el rato se ejecuta
  */

  useEffect(() => {
    fetch('https://cristinamaser.com/api/invitations')
      .then(response => response.json())
      .then(responseJson => { setInvitations(responseJson.data) });
  }, []);

  // El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada. Podría buscar en varios campos del array
  // Some evalua si al menos un elemento del array cumple con la condición
  // indexof busca un elemento
  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  return (
    <div>
      <h1>Invitaciones</h1>
      {/*<button onClick={() => setCount(count + 1)}>
        Sumar
      </button>*/}
      {/*<div className="select">
        <select
          onChange={(e) => {
            setFilterParam(e.target.value);
          }}
          className="custom-select"
          aria-label="Filtrar por grupo"
        >
          <option value="All">Todas</option>
          <option value="Arquitectura">Arquitectura</option>
          <option value="Flores">Flores</option>
        </select>
        <span className="focus"></span>
      </div>*/}
      <input
        type="search"
        name="search-form"
        id="search-form"
        className="search-input"
        placeholder="Buscar..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="container-flex d-flex flex-wrap align-items-center">
        {search(invitations).map((invitation, i) => (
          <Invitation src={invitation.invitationimg[0].src} name={invitation.nombre} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Invitations;
