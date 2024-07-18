import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // const products = [
    //   {
    //     name: "product1",
    //     rules: [
    //       { field: "age", operand: "more than", value: "18" },
    //       { field: "firstName", operand: "equals", value: "shiv" },
    //     ],
    //   },
    //   {
    //     name: "product2",
    //     rules: [{ field: "age", operand: "more than", value: "45" }],
    //   },
    //   {
    //     name: "product3",
    //     rules: [{ field: "firstName", operand: "equals", value: "shiv" }],
    //   },
    // ];

    // let newProducts = [];
    // for (let index = 0; index < products.length; index++) {
    //   const rules = products[index].rules;
    //   for (let index = 0; index < rules.length; index++) {
    //     const eachRule = rules[index];
    //     console.log(eachRule);
    //     if (eachRule.operand === "equals") {
    //       const fieldName = eachRule.field;

    //       const fieldValue = eachRule.value;
    //       if (fieldName === "firstName") {
    //         if (formState.firstName === fieldValue) {
    //           console.log("hi");
    //           newProducts.push(products[index]);
    //         }
    //       } else if (fieldName === "Lastname") {
    //         //logic
    //       }
    //     } else if (eachRule.operand === "greater") {
    //       //write logic for that check
    //     }
    //   }
    // }
    // debugger;
    // console.log(newProducts);

    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
