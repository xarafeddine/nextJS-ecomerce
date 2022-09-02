import Head from "next/head";
import { FaShoppingCart } from "react-icons/fa";
import styles from "../styles/Cart.module.css";

import { useCart } from "../hooks/use-cart.js";

import products from "../products.json";

import Table from "../components/Table";

const columns = [
  {
    columnId: "title",
    Header: "Product Name",
  },
  {
    columnId: "quantity",
    Header: "Quantity",
  },
  {
    columnId: "pricePerItem",
    Header: "Price Per Item",
  },
  {
    columnId: "total",
    Header: "Item Total",
  },
];

export default function Home() {
  /**
   * @lesson-14-solution Exercise 3
   * Using the same useCart hook as in earlier lessons,
   * we can import our cartItems, then map them to a
   * new array in the correct format for our table.
   */

  const { cartItems, checkout, updateItem } = useCart();

  const data = cartItems.map(({ id, quantity, pricePerItem }) => {
    const product = products.find(({ id: pid }) => pid === id);
    const { title } = product || {};
    const Quantity = () => {
      function handleOnSubmit(e) {
        e.preventDefault();

        const { currentTarget } = e;
        const inputs = Array.from(currentTarget.elements);

        const quantity = inputs.find(
          (input) => input.name === "quantity"
        )?.value;

        updateItem({
          id,
          quantity: quantity && +quantity,
        });
        console.log("submit", quantity);
      }

      return (
        <form className={styles.cartQuantity} onSubmit={handleOnSubmit}>
          <input
            name="quantity"
            type="number"
            min={0}
            defaultValue={quantity}
          />
          <button className={styles.button}>Update</button>
        </form>
      );
    };

    return {
      id,
      title,
      quantity: <Quantity />,
      pricePerItem: pricePerItem.toFixed(2),
      total: (quantity * pricePerItem).toFixed(2),
    };
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping Cart - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} columns={columns} />

        <p className={styles.checkout}>
          {/**
           * @lesson-14-solution Exercise 4
           * We can additionally import the checkout function
           * from our useCart hook and trigger it with the onClick
           * handler to start a new checkout session.
           */}
          <button className={styles.button} onClick={checkout}>
            Check Out
          </button>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
