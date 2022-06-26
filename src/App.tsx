import { useEffect, useState } from "react";
import Render from "./components/Render";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState<any[]>();

  const getData = async () => {
    const response = await fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return await response.json();
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: Record<string, any>,
    key: string,
    index: number
  ) => {
    let inputValue: any = e.target.value;

    if (e.target.type === "radio") {
      inputValue = !item[key];
    }

    setLoaded((oldValue) => {
      if (oldValue) {
        const newValue = [...oldValue];
        newValue[index][key] = inputValue;
        return newValue;
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getData()
      .then((data) => {
        setLoaded(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {loaded && (
        <div
          style={{
            width: "100%",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {loaded.map((item, index) => {
            return (
              <div
                key={item._id}
                style={{
                  border: "2px solid red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {Object.keys(item).map((key) => {
                  return (
                    <Render
                      key={key}
                      inputChangeHandler={(e) => {
                        inputChangeHandler(e, item, key, index);
                      }}
                      property={key}
                      value={item[key]}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default App;
