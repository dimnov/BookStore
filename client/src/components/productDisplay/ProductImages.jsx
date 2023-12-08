export default function ProductImages({ images }) {
  return (
    <div className="productdisplay-img-list">
      {images.map((image, index) => (
        <img key={index} src={image} alt={`book image ${index + 1}`} />
      ))}
    </div>
  );
}
