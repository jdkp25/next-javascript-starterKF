import { useState, useEffect } from "react";
import { ConnectWallet, useNetwork, useAddress, useContract } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

// ABI definitions remain unchanged
const OLD_KILT_ABI = [/* ... */];
const MIGRATION_ABI = [/* ... */];

export default function Home() {
  const [{ data: network }, switchNetwork] = useNetwork();
  const address = useAddress();
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(null);

  const { contract: oldKiltContract, isLoading: contractLoading, error: contractError } = useContract(
    "0x944f601b4b0edb54ad3c15d76cd9ec4c3df7b24b",
    OLD_KILT_ABI
  );
  const { contract: migrationContract } = useContract(
    "0x322422335ea70370557d475e94d85cfd0ec15637",
    MIGRATION_ABI
  );

  useEffect(() => { /* network switching logic */ }, [network, switchNetwork]);
  useEffect(() => { /* balance fetching logic */ }, [address, oldKiltContract]);

  const handleApprove = async () => { /* ... */ };
  const handleMigrate = async () => { /* ... */ };

  return (
    <div style={{ backgroundColor: "#13061f", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <header style={{ padding: "20px", textAlign: "center", backgroundColor: "#333", color: "#fff" }}>
        <h1 style={{ margin: 0, fontSize: "24px" }}>KILT Migration Portal</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <img src="https://github.com/jdkp25/next-javascript-starterKF/blob/main/KILT-Horizontal-white.png" alt="KILT Logo" />
            <p>Migrate KILT from</p>
            <p><code>0x944f601b4b0edb54ad3c15d76cd9ec4c3df7b24b</code></p>
            <p>to</p>
            <p><code>0x3079844be6416b6a24a24505fa465eafc3b2b4f9</code></p>
            <p>Migration ratio 1:1.75</p>
          </div>

          <div className={styles.header} style={{ textAlign: "center" }}>
            <div className={styles.connect}>
              <ConnectWallet />
            </div>

            {address ? (
              <div>
                <p>Wallet: {address}</p>
                <p>
                  Migrateable KILT Balance:{" "}
                  {contractLoading
                    ? "Contract loading..."
                    : balance === null
                    ? "Loading..."
                    : balance === "Error"
                    ? "Failed to load (check console)"
                    : `${Number(balance).toLocaleString()} KILT`}
                </p>
                {contractError && <p>Contract error: {contractError.message}</p>}
              </div>
            ) : (
              <p>Connect your wallet to view balance.</p>
            )}

            <div style={{ margin: "20px 0" }}>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter KILT amount"
                className={styles.code}
                style={{ margin: "10px", padding: "8px", width: "200px" }}
              />
              <div className={styles.grid} style={{ justifyContent: "center" }}>
                <button
                  onClick={handleApprove}
                  disabled={!amount || !address}
                  className={styles.card}
                  style={{ margin: "10px", padding: "10px 20px" }}
                >
                  Approve Migration
                </button>
                <button
                  onClick={handleMigrate}
                  disabled={!amount || !address}
                  className={styles.card}
                  style={{ margin: "10px", padding: "10px 20px" }}
                >
                  Migrate Tokens
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer style={{ padding: "10px", textAlign: "center", color: "#666", fontSize: "14px" }}>
        <p>Secure migration portal | migrate.kilt.io</p>
      </footer>
    </div>
  );
}
