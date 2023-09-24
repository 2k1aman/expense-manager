import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <> 
      <div className="d-flex justify-content-between bg-secondary align-items-center">
          <div className="p-3 flex text-light"><h2> {name}'s Expense Manager</h2></div>
          <div className="flex mx-5">
            <a className="navbar-brand m-2" href="#">
              <img src={profilePhoto} alt="Bootstrap" style={{borderRadius:50 , width:35}} />
            </a>
            <div className="btn btn-warning btn-sm" onClick={signUserOut}><strong>sign out</strong></div>
          </div>
      </div>
      <div className="p-3 align-items-center d-flex flex-column bg-light" >
          <div className="balance text-warning ">
            <h3><b>Your Balance</b></h3>
            {balance >= 0 ? <h2> ₹{balance}</h2> : <h2> -₹{balance * -1}</h2>}
          </div>
          <div className="summary ">
            <div className="income text-success">
              <h4><b>Total Income</b></h4>
              <p>₹{income}</p>
            </div>
            <div className="expenses text-danger">
              <h4><b>Total Expenses</b></h4>
              <p>₹{expenses}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              className="mx-2"
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="mx-2"
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              className="mx-2"
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense"> Expense</label>
            <input
              className="mx-2"
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income"> Income</label>
            <button className="btn btn-primary mx-5"  type="submit"> Add Transaction</button>
          </form>
      </div>
        <div className="container d-flex flex-column mb-3">
        <div className="mx-auto "><h3> Transactions</h3></div>
        <ul className="list-group">
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li className="list-group-item" style={{
                backgroundColor: transactionType === "expense" ? "#FF6969" : "#A8DF8E",
              }}>
                <h4> {description} </h4>
                <p className="fw-semibold">
                  ₹{transactionAmount} •{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    
                    {" "}
                    {transactionType}{" "}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
        </div>
        <footer>
        <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
          ©  2023  Copyright :  
          <a class="text-reset fw-bold" href="https://github.com/2k1aman" style={{textDecoration:"none"}}> Aman kumar</a>
        </div>
        
        </footer>  
    </>
  );
};
