import {
  filterByPrice,
  filterByBrand,
  filterByModel,
} from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Filter.css";
import SearchIcon from "../../assets/SearchIcon";
import { useState } from "react";

const Filter = () => {
  const dispatch = useDispatch();

  const brands = useSelector((state) => state.products.brands);
  const models = useSelector((state) => state.products.models);
  const selectedModels = useSelector((state) => state.products.selectedModels);
  const selectedBrands = useSelector((state) => state.products.selectedBrands);

  const [searchTermForBrands, setSearchTermForBrands] = useState("");
  const [selectedBrandsForSearch] = useState([]);
  const handleSearchForBrands = (event) => {
    setSearchTermForBrands(event.target.value);
  };
  const [searchTermForModels, setSearchTermForModels] = useState("");
  const [selectedModelsForSearch] = useState([]);
  const handleSearchForModels = (event) => {
    setSearchTermForModels(event.target.value);
  };

  const sortOptions = [
    {
      id: "oldToNew",
      value: "oldToNew",
      sortField: "oldToNew",
      displayName: "Old to new",
    },
    {
      id: "newToOld",
      value: "newToOld",
      sortField: "newToOld",
      displayName: "New to old",
    },
    {
      id: "highToLow",
      value: "highToLow",
      sortField: "highToLow",
      displayName: " High to low",
    },
    {
      id: "lowToHigh",
      value: "lowToHigh",
      sortField: "lowToHigh",
      displayName: "Low to high",
    },
  ];

  const handlePriceSort = (sortBy) => {
    dispatch(filterByPrice({ sortBy }));
  };

  const handleBrandFilter = (event) => {
    const brand = event.target.value;
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((item) => item !== brand)
      : [...selectedBrands, brand];
    dispatch(filterByBrand(updatedBrands));
  };

  const handleModelFilter = (event) => {
    const model = event.target.value;
    const updatedModels = selectedModels.includes(model)
      ? selectedModels.filter((item) => item !== model)
      : [...selectedModels, model];
    dispatch(filterByModel(updatedModels));
  };

  return (
    <div className="filterWrapper">
      {brands?.length > 0 && (
        <div className="filterContainer">
          <h2>Sort by</h2>
          <div className="filterItem">
            {sortOptions.map((option) => (
              <div key={option.id} className="inputItem">
                <input
                  type="radio"
                  id={option.id}
                  value={option.value}
                  name="option"
                  onChange={() => handlePriceSort(option.sortField)}
                />
                <label htmlFor={option.id}>{option.displayName}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      {brands?.length > 0 && (
        <div className="filterContainer">
          <h2>Brands</h2>
          <div className="filterItem">
            <div className="search">
              <SearchIcon />
              <input
                className="searchInput"
                type="text"
                placeholder="Search"
                value={searchTermForBrands}
                onChange={handleSearchForBrands}
              />
            </div>
            <div className="scrollable">
              {brands
                .filter(
                  (brand) =>
                    selectedBrandsForSearch.length === 0 ||
                    selectedBrandsForSearch.includes(brand)
                )
                .filter((brand) =>
                  brand
                    .toLowerCase()
                    .includes(searchTermForBrands.toLowerCase())
                )
                ?.map((brand) => (
                  <div key={brand.id} className="inputItem">
                    <input
                      type="checkbox"
                      id={brand}
                      value={brand}
                      onChange={handleBrandFilter}
                    />
                    <label htmlFor={brand}>{brand}</label>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {models?.length > 0 && (
        <div className="filterContainer">
          <h2>Model</h2>
          <div className="filterItem">
            <div className="search">
              <SearchIcon />
              <input
                className="searchInput"
                placeholder="Search"
                type="text"
                value={searchTermForModels}
                onChange={handleSearchForModels}
              />
            </div>
            <div className="scrollable">
              {models
                .filter(
                  (model) =>
                    selectedModelsForSearch.length === 0 ||
                    selectedModelsForSearch.includes(model)
                )
                .filter((model) =>
                  model
                    .toLowerCase()
                    .includes(searchTermForModels.toLowerCase())
                )
                ?.map((model) => (
                  <div key={model.id} className="inputItem">
                    <input
                      type="checkbox"
                      id={model}
                      value={model}
                      onChange={handleModelFilter}
                    />
                    <label htmlFor={model}>{model}</label>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
