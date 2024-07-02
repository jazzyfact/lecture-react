import { on, qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";

export default class SearchFormView extends View {
  constructor() {
    super(qs("#search-form-view"));

    this.inputElement = qs("[type=text]", this.element);
    this.resetElement = qs("[type=reset]", this.element);

    this.showResetButton(false);
    this.bindEvent();
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }

  bindEvent() {
    on(this.inputElement, "keyup", () => this.handleKeyup());
    on(this.element, "submit", (event) => this.handleSubmit(event));
  }

  handleKeyup() {
    console.log(tag, "handleKeyup", this.inputElement.value);
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(tag, "handleSumit");
    const { value } = this.inputElement;
    this.emit("@submit", { value });
  }
}
