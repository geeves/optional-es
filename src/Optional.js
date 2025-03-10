import hash from "js-hash-code";
import {isNotnull, isnull} from "./isnull";
import {isfunction, isNotfunction} from "./isfunction";

class Optional {
  constructor(value, loaded) {
    // We have to overload somehow.
    if (2 > arguments.length) {
      this.value = null;
    }
    this.value = value;
  }

  static get EMPTY() {
    return new Optional();
  }


  /**
   * Returns an empty {@code Optional} instance.  No value is present for this
   * {@code Optional}.
   *
   * @apiNote
   * Though it may be tempting to do so, avoid testing if an object is empty
   * by comparing with {@code ==} against instances returned by
   * {@code Optional.empty()}.  There is no guarantee that it is a singleton.
   * Instead, use {@link #isPresent()}.
   *
   * @param <T> The type of the non-existent value
   * @return an empty {@code Optional}
   */
  static empty() {
    return Optional.EMPTY;
  }

  /**
   * Returns an {@code Optional} describing the given non-{@code null}
   * value.
   *
   * @param value the value to describe, which must be non-{@code null}
   * @param <T> the type of the value
   * @return Optional {@code Optional} with the value present
   * @throws Error:NullPointerException if value is {@code null}
   */
  static of(value) {
    if (true === isnull(value)) {
      throw new Error("[NullPointerException]   Optional value cannot be undefined or null");
    }
    return new Optional(value, true);
  }

  /**
   * Returns an {@code Optional} describing the given value, if
   * non-{@code null}, otherwise returns an empty {@code Optional}.
   *
   * @param value the possibly-{@code null} value to describe
   * @param <T> the type of the value
   * @return Optional {@code Optional} with a present value if the specified value
   *         is non-{@code null}, otherwise an empty {@code Optional}
   */
  static ofNullable(value) {
    if (true === isnull(value)) {
      return this.empty();
    }
    return this.of(value);
  }

  /**
   * If a value is present, returns {@code true}, otherwise {@code false}.
   *
   * @return {@code true} if a value is present, otherwise {@code false}
   */
  isPresent() {
    return true === isNotnull(this.value);
  }

  /**
   * If a value is present, returns {@code true}, otherwise {@code false}.
   *
   * @return {@code true} if a value is present, otherwise {@code false}
   */
  isEmpty() {
    return true === isnull(this.value);
  }

  /**
   * If a value is present, performs the given action with the value,
   * otherwise does nothing.
   *
   * @param action the action to be performed, if a value is present
   * @throws Error:NullPointerException if value is present and the given action is
   *         {@code null}
   */
  ifPresent(action) {
    if (true === this.isPresent()
      && isNotnull(action)
      && true === isNotfunction(action)) {
      throw new Error("[NullPointerException]   'action' is not a method");
    }
    if (true === this.isPresent() && isfunction(action)) {
      action();
    }
  }

  /**
   * If a value is present, performs the given action with the value,
   * otherwise performs the given empty-based action.
   *
   * @param action the action to be performed, if a value is present
   * @param emptyAction the empty-based action to be performed, if no value is
   *        present
   * @throws Error:NullPointerException if a value is present and the given action
   *         is {@code null}, or no value is present and the given empty-based
   *         action is {@code null}.
   * @since 9
   */
  ifPresentOrElse(action, emptyAction) {
    if ((true === this.isPresent() && true === isNotfunction(action))
      || (false === this.isPresent() && true === isNotfunction(emptyAction))) {
      throw new Error("[NullPointerException] 'action' and/or 'emptyAction' are not present");
    }
    if (this.isPresent()) {
      action(this.value)
    } else {
      emptyAction();
    }
  }

  /**
   * If a value is present, returns the value, otherwise throws
   * {@code TypeError:NoSuchElementException}.
   *
   * @return the non-{@code null} value described by this {@code Optional}
   * @throws TypeError:NoSuchElementException if no value is present
   * @see Optional#isPresent()
   */
  get() {
    if (false === this.isPresent()) {
      throw new TypeError("[NoSuchElementException]    No value present in optional");
    }
    return this.value;
  }


  /**
   * If a value is present, returns an {@code Optional} describing the value,
   * otherwise returns an {@code Optional} produced by the supplying function.
   *
   * @param supplier the supplying function that produces an {@code Optional}
   *        to be returned
   * @return returns an {@code Optional} describing the value of this
   *         {@code Optional}, if a value is present, otherwise an
   *         {@code Optional} produced by the supplying function.
   * @throws Error:NullPointerException if the supplying function is {@code null} or
   *         produces a {@code null} result
   */
  or(supplier) {
    if (true === isnull(supplier)
      || true === isNotfunction(supplier)) {
      throw new Error("[NullPointerException] Supplier is null");
    }
    if (true === this.isPresent()) {
      return this;
    } else {
      const optional = supplier();
      if (true === isnull(optional)) {
        throw new Error("[NullPointerException] result of supplier is null");
      }
      if (false === optional instanceof Optional) {
        throw new Error("[NullPointerException] result of supplier is null");
      }
      return optional;
    }
  }

  /**
   * If a value is present, returns the value, otherwise returns
   * {@code other}.
   *
   * @param other the value to be returned, if no value is present.
   *        May be {@code null}.
   * @return the value, if present, otherwise {@code other}
   */
  orElse(other) {
    if (true === this.isPresent()) {
      return this.value;
    } else {
      return other;
    }
  }

  /**
   * If a value is present, returns the value, otherwise returns the result
   * produced by the supplying function.
   *
   * @param supplier the supplying function that produces a value to be returned
   * @return the value, if present, otherwise the result produced by the
   *         supplying function
   * @throws Error:NullPointerException if no value is present and the supplying
   *         function is {@code null}
   */
  orElseGet(supplier) {
    if (true === isnull(this.value)
      && true === isNotfunction(supplier)) {
      throw new Error("[NullPointerException]   value or 'function' are not present");
    }
    return isNotnull(this.value) ? this.value : supplier();
  }

  /**
   * If a value is present, returns the value, otherwise throws an exception
   * produced by the exception supplying function.
   *
   * @apiNote
   * A method reference to the exception constructor with an empty argument
   * list can be used as the supplier. For example,
   * {@code IllegalStateException::new}
   *
   * @param <X> Type of the exception to be thrown
   * @param exceptionSupplier the supplying function that produces an
   *        exception to be thrown
   * @return the value, if present
   * @throws X if no value is present
   * @throws Error:NullPointerException if no value is present and the exception
   *          supplying function is {@code null}
   */
  orElseThrow(exceptionSupplier) {
    if (false === this.isPresent()
      && true === isNotnull(exceptionSupplier)
      && false === (exceptionSupplier instanceof Error)) {
      throw new Error("[NullPointerException] Value is not present or 'exceptionSupplier' is not an Error");
    }

    if (true === this.isPresent()) {
      return this.value;
    } else {
      throw exceptionSupplier();
    }
  }

  /**
   * If a value is present, and the value matches the given predicate,
   * returns an {@code Optional} describing the value, otherwise returns an
   * empty {@code Optional}.
   *
   * @param predicate the predicate to apply to a value, if present
   * @return Optional {@code Optional} describing the value of this
   *         {@code Optional}, if a value is present and the value matches the
   *         given predicate, otherwise an empty {@code Optional}
   * @throws Error:NullPointerException if the predicate is {@code null}
   */
  filter(predicate) {
    if (true === isNotfunction(predicate)) {
      throw new Error("[NullPointerException]   'predicate' is not a Function");
    }
    if (false === this.isPresent()) {
      return new Optional();
    }

    if (isfunction(predicate) && true === predicate(this.value)) {
      return Optional.of(this.value);
    }
    return Optional.empty();
  }

  /**
   * If a value is present, returns an {@code Optional} describing (as if by
   * {@link #ofNullable}) the result of applying the given mapping function to
   * the value, otherwise returns an empty {@code Optional}.
   *
   * @param mapper the mapping function to apply to a value, if present
   * @param <U> The type of the value returned from the mapping function
   * @return Optional {@code Optional} with the resulting value
   *
   * @throws Error:NullPointerException if the mapping function is {@code null}
   */
  map(mapper) {
    let mappedval = null;
    if (true === isNotfunction(mapper)) {
      throw new Error("[NullPointerException]   predicate 'mapper' is not a Function");
    }
    if (false === this.isPresent()) {
      return this.empty();
    }
    if (isnull(this.value)) {
      return new Optional();
    }
    mappedval = mapper(this.value);
    return isnull(mappedval) ? new Optional() : Optional.of(mappedval);
  }

  /**
   * If a value is present, returns the result of applying the given
   * {@code Optional}-bearing mapping function to the value, otherwise returns
   * an empty {@code Optional}.
   *
   * <p>This method is similar to {@link #map(Function)}, but the mapping
   * function is one whose result is already an {@code Optional}, and if
   * invoked, {@code flatMap} does not wrap it within an additional
   * {@code Optional}.
   *
   * @param <U> The type of value of the {@code Optional} returned by the
   *            mapping function
   * @param mapper the mapping function to apply to a value, if present
   * @return the result of applying an {@code Optional}-bearing mapping
   *         function to the value of this {@code Optional}, if a value is
   *         present, otherwise an empty {@code Optional}
   * @throws Error:NullPointerException if the mapping function is {@code null} or
   *         returns a {@code null} result
   */
  flatMap(mapper) {
    if (true === isNotfunction(mapper)) {
      throw new Error("[NullPointerException]   predicate 'mapper' is not a Function");
    }
    if (false === this.isPresent()) {
      return Optional.empty();
    }

    const flatMapped = mapper(this.value);

    if (true === isnull(flatMapped)
      || false === flatMapped instanceof Optional
      || true === isnull(flatMapped.get)) {
      throw new Error("[NullPointerException]   'flatMapped' is not an instance of Optional");
    }
    return flatMapped;
  }

  /**
   * Indicates whether some other object is "equal to" this {@code Optional}.
   * The other object is considered equal if:
   * <ul>
   * <li>it is also an {@code Optional} and;
   * <li>both instances have no value present or;
   * <li>the present values are "equal to" each other via {@code equals()}.
   * </ul>
   *
   * @param obj an object to be tested for equality
   * @return {@code true} if the other object is "equal to" this object
   *         otherwise {@code false}
   */
  equals(optional) {
    const hasValue = isNotnull(this.value);
    if (false === (optional instanceof Optional)) {
      return false;
    }
    if (true === isnull(this.value)) {
      return false;
    }
    try {
      // the present values are "equal to"
      if (this.value === optional.get()) {
        return true;
      }
    } catch (e) {
      // optional is null and this.value is null
      if (false === hasValue) {
        return true;
      }
      return false;
    }
    return false;
  }

  /**
   * Returns the hash code of the value, if present, otherwise {@code 0}
   * (zero) if no value is present.
   *
   * @return hash code value of the present value or {@code 0} if no value is
   *         present
   */
  hashCode() {
    if (false === this.isPresent()) {
      return 0;
    }
    return hash(this);
  }


  /**
   * Returns a non-empty string representation of this {@code Optional}
   * suitable for debugging.  The exact presentation format is unspecified and
   * may vary between implementations and versions.
   *
   * @return the string representation of this instance
   */
  toString() {
    const type = typeof this.value;
    return false === this.isPresent()
      ? `Optional[${type}] ${this.value}`
      : "Optional.empty";
  }

}

export default Optional;
