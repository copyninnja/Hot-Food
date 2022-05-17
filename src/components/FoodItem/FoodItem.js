import React from "react";
import { Link } from "react-router-dom";
import { getAllRequestList } from "../../api";
import {deleteFoodItem} from "../../api/FoodItemApi";

const FoodItem = (props) => {
  // const { id, name, description, price, img } = props.food;

  // return (
  //   <div className="col-md-4 mb-4">
  //     <Link to={"food/" + id}>
  //       <div className="card text-center">
  //         <img src={img} alt="FoodItem" className="card-img-top" />

  //         <div className="card-body">
  //           <h5>{name}</h5>
  //           <p>{description}</p>
  //           <h4>£{price.toFixed(2)}</h4>
  //         </div>
  //       </div>
  //     </Link>
  //   </div>
  // );
  const { id, foodName, foodDescription, foodPrice, photoUrl} = props.food;
  alert(JSON.stringify(props.food));
  const deleteFood = () => {
    try{
      deleteFoodItem(id);
    }catch(error){
      alert(error.msg);
    }
    alert("delete successful");
  };

  return (
    <div className="col-md-4 mb-4">
      
        <div className="card text-center">
          <img height="200" width="200" src={photoUrl} alt="FoodItem" className="card-img-top" />

          <div className="card-body">
            <h5>{foodName}</h5>
            <p>{foodDescription}</p>
            <h4>£{foodPrice}</h4>
          </div>
          <div className="form-group">
              <button className="btn btn-danger btn-block" onClick={deleteFood}>
                Delete
              </button>
            </div>
        </div>
     
    </div>
  );
};

export default FoodItem;
