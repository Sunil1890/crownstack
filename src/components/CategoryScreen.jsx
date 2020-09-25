import React, { useEffect, useState } from "react";

function CategoryScreen(props) {
  let [categoryData, setCategoryData] = useState("");
  useEffect(() => {
    setCategoryData(props.categories);
  }, [props]);
  return (
    <>
      <main className="page-main">
        <div className="row">
          {categoryData.categories
            ? categoryData.categories.map(data => (
                <div className="column">
                  <div className="card">
                    <img
                      src={require(`../assets/category/${data.image}`)}
                      alt="Denim Jeans"
                      style={{width: "100%"}}
                    />
                    <button>{data.name}</button>
                  </div>
                </div>
              ))
            : null}
        </div>
      </main>
    </>
  );
}

export default CategoryScreen;
