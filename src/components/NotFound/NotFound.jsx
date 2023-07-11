const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        marginLeft: "50%",
        width: "500px",
        gap: "1rem",
      }}
    >
      <span>Not Found</span>
      <p>Unfortunately, we could not find the product you were looking for.</p>
    </div>
  );
};

export default NotFound;
