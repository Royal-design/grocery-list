export const Footer = ({ item }) => {
  if (item.length > 1)
    return (
      <footer>
        <p>{item.length} Items are available</p>
      </footer>
    );
  if (item.length < 1)
    return (
      <footer>
        <p>No item is availbale</p>
      </footer>
    );
  if (item.length === 1)
    return (
      <footer>
        <p>{item.length} Item is available</p>
      </footer>
    );
};
