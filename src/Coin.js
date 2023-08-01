const Coin = ({
  image,
  name,
  price,
  volume,
  pricechange,
  marketcap,
  symbol,
}) => {
  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="Crpyto" />
          <h1>{name}</h1>
          <p className="coin-symbol"></p>
        </div>
        <div className="coin-data">
          <p className="coin-price">Rs.{price}</p>
          {pricechange < 0 ? (
            <p className="coin-percent red">{pricechange.toFixed(2)}%</p>
          ) : (
            <p className="coin-percent green">{pricechange.toFixed(2)}%</p>
          )}
          <p className="coin-marketcap">
            mkt Cap:Rs.{marketcap.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Coin;
