const inputs = document.querySelectorAll(".controls input");

function handleUpdate() {
  let word = this.dataset.sizing || ""
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + word
  );
}

inputs.forEach((input) => input.addEventListener("change", handleUpdate));
inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate));
