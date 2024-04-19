
// eslint-disable-next-line react/prop-types
function SearchBar({ onSearch }) {
  
  

  const handleSearchClick = () => {
    const input = document.getElementById("searchInput");
    const value = input.value;
    onSearch(value);
  };

  return (
    <div className="flex justify-center">
    <input
    id="searchInput"
      type="text"
      placeholder="Search by name volume..."
      
     
      className="w-2/4 px-4 py-1  border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
    <button
        onClick={handleSearchClick}
        className="ml-2 px-4 py-1  bg-gray-800 text-whiterounded-md hover:bg-gray-950 focus:outline-none"
      >
        Search
      </button>
  </div>
  
  );
}

export default SearchBar;
