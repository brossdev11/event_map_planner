const Button = (props) => {
  return (
    <button
      className={`rounded-full text-xl font-bold px-8 py-3 ${props.className} ${
        props.style === "primary"
          ? props.selected
            ? "border-2 border-[#6E84FF] text-[#6E84FF]"
            : "bg-[#6E84FF] text-white"
          : "bg-gray-50 text-[#868686]"
      }`}
      onClick={() => props.onClick?props.onClick():''}
      type={props.type ? props.type : "submit"}
    >
      {props.children}
    </button>
  );
};

export default Button;
