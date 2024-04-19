// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Modal from "react-modal";

const Charactersquery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCharacters, setAllCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState("grid");
  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  const cardsPerPage = 12;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = allCharacters.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(allCharacters.length / cardsPerPage);

  useEffect(() => {
    const fetchComics = async () => {
      setLoading(true); // Iniciar la carga

      let proxyUrl = "https://cors-anywhere.herokuapp.com/",
        targetUrl = `https://comicvine.gamespot.com/api/`;

      try {
        const response = await fetch(
          proxyUrl +
            targetUrl +
            `issues/?api_key=f9e52c087adb73b4553fe110ae11d206d7316ac4&format=json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch comics");
        }
        const data = await response.json();
        console.log("Data from API:", data);

        // Aquí filtramos y establecemos los personajes
        if (searchTerm === "") {
          setAllCharacters(data.results);
        } else {
          const searchNameCharacters = data.results.filter((character) =>
            character.volume.name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
          setAllCharacters(searchNameCharacters);
        }
      } catch (error) {
        console.error("Error fetching comics:", error);
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchComics();
  }, [searchTerm, currentPage]);
  // Solo vuelve a cargar los cómics cuando currentPage cambia

  const openModal = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const toggleView = () => {
    // Cambiar entre vista de cuadrícula y vista de lista
    setViewType(viewType === "grid" ? "list" : "grid");
  };

  return (
    <div>
      {loading ? (
        <div className=" flex items-center ml-[550px] font-bold ">
          Loading your comics be patient..
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between px-4 md:px-6 lg:px-12 xl:px-20 py-4">
            {/* Botón para cambiar entre vista de cuadrícula y vista de lista */}
            <button
              onClick={toggleView}
              className=" py-1 bg-gray-800 text-white rounded  w-32 h-9 mt-3.5 hover:bg-gray-900"
            >
              {viewType === "grid" ? "List mode" : "Grid Mode"}
            </button>
            {viewType === "grid" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-5 h-5 ml-[-310px] mt-[16px] list mode"
              >
                <path d="M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mt-[16px]    ml-[-125px]  grid mode"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                />
              </svg>
            )}
            <div className="w-[720px] mt-4 ml-7">
              <SearchBar onSearch={setSearchTerm} />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mt-5 ml-3 cursor-pointer"
              onClick={() => window.location.reload()}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>

          <div
            className={
              viewType === "grid"
                ? "grid gap-4 grid-cols-3 items-center w-full py-10 px-80"
                : "flex flex-col items-center w-48 ml-[550px] mt-8"
            }
          >
            {currentCards.map((character, index) => (
              <figure
                key={index}
                className={
                  viewType === "grid"
                    ? "relative mb-2 w-full cursor-pointer"
                    : "relative mb-4 cursor-pointer"
                }
              >
                <img
                  src={character.image.medium_url}
                  alt={character.name}
                  onClick={() => openModal(character)}
                />

                <p className="absolute bottom-0 bg-gray-900 p-1.5 w-full  bg-opacity-70 text-white text-center font-semibold">
                  {character.name ? character.name : character.volume.name}
                </p>
              </figure>
            ))}
          </div>
          <div className="flex justify-center mb-7">
            {/* Botones de paginación */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              Prev
            </button>

            {/* Números de página */}
            {Array.from({ length: totalPages }, (_, index) => (
              <span
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded cursor-pointer ${
                  currentPage === index + 1
                    ? " text-stone-950 font-bold"
                    : " text-white"
                }`}
              >
                {index + 1}
              </span>
            ))}

            {/* Botón Next */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentCards.length < cardsPerPage}
              className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              Next
            </button>
          </div>
          <Modal
            isOpen={showModal}
            contentLabel="Detalles del personaje"
            className="flex items-center justify-center"
            overlayClassName="bg-black bg-opacity-70 fixed inset-0 border-none outline-none"
          >
            <div className="bg-gray-900 rounded-lg p-8 mt-11 flex justify-center items-center  relative">
              {selectedCharacter && (
                <div className="text-white flex">
                  <div className="mr-8">
                    <p className="mt-20 text-2xl font-semibold">
                      {" "}
                      {selectedCharacter.name
                        ? selectedCharacter.name
                        : selectedCharacter.volume.name}
                    </p>
                    <div className="mt-4">
                      {selectedCharacter.description && (
                        <>
                          <p className="font-semibold text-lg">Description:</p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: selectedCharacter.description,
                            }}
                          />
                        </>
                      )}
                    </div>
                    <div className="mt-6">
                      <p className="font-semibold">
                        Cover Date:{" "}
                        {new Date(
                          selectedCharacter.cover_date
                        ).toLocaleDateString()}
                      </p>
                      <p className="font-semibold">
                        Date Added:{" "}
                        {new Date(
                          selectedCharacter.date_added
                        ).toLocaleDateString()}
                      </p>
                      <p className="font-semibold">
                        Last Updated:{" "}
                        {new Date(
                          selectedCharacter.date_last_updated
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 w-72">
                    <img
                      src={selectedCharacter.image.super_url}
                      alt={selectedCharacter.name}
                    />
                  </div>
                  <div className="absolute top-2 right-2 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-7 h-7"
                      onClick={closeModal}
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Charactersquery;
