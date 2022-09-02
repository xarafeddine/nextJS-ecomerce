import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import products from "../products.json";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../hooks/use-cart";
import Link from "next/link";

export default function Home() {
  const { subtotal, totalItems, addToCart, checkout } = useCart();

  return (
    <div className={styles.container}>
      <Head>
        <title>Regular Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcom to Regular Shop</h1>

        <p className={styles.description}>
          the most expensive fake online shop on the web!
          <br />
          if you wanna wast your money this is the right place
        </p>

        <ul className={styles.grid}>
          {products.map((prod) => {
            const { id, title, description, image, price } = prod;
            return (
              <li key={id} className={styles.card}>
                <Link href={`/products/${id}`}>
                  <a>
                    <img src={image} alt={title} />
                    <h2>{title}</h2>
                    <p>$ {price}</p>
                    <p>{description}</p>
                  </a>
                </Link>

                <br />
                <p>
                  <button
                    className={styles.button}
                    onClick={() => {
                      addToCart({
                        id,
                      });
                    }}
                  >
                    Add to cart
                  </button>
                </p>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
