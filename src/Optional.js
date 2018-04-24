import hash from "js-hash-code";
import {isnotnull, isnull} from "./isnull";
import {isfunction, isnotfunction} from "./isfunction";

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
   * @return an {@code Optional} with the value present
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
   * @return an {@code Optional} with a present value if the specified value
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
    return true === isnotnull(this.value);
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
      && isnotnull(action)
      && true === isnotfunction(action)) {
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
    if ((true === this.isPresent() && true === isnotfunction(action))
      || (false === this.isPresent() && true === isnotfunction(emptyAction))) {
      throw new Error("[NullPointerException]   'action' and/or 'emptyAction' are not present");
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
      || true === isnotfunction(supplier)) {
      throw new Error("[NullPointerException]    Supplier is null");
    }
    if (true === this.isPresent()) {
      return this;
    } else {
      const optional = supplier();
      if (true === isnull(optional)) {
        throw new Error("[NullPointerException]    result of supplier is null");
      }
      if (false === optional instanceof Optional) {
        throw new Error("[NullPointerException]    result of supplier is null");
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
      && true === isnotfunction(supplier)) {
      throw new Error("[NullPointerException]   value or 'function' are not present");
    }
    return isnotnull(this.value) ? this.value : supplier.get();
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
      && true === isnotnull(exceptionSupplier)
      && false === (exceptionSupplier instanceof Error)) {
      throw new Error("[NullPointerException]   Value is not present or 'exceptionSupplier' is not an Error");
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
   * @return an {@code Optional} describing the value of this
   *         {@code Optional}, if a value is present and the value matches the
   *         given predicate, otherwise an empty {@code Optional}
   * @throws Error:NullPointerException if the predicate is {@code null}
   */
  filter(predicate) {
    if (true === isnotfunction(predicate)) {
      throw new Error("[NullPointerException]   'predicate' is not a Function");
    }
    if (false === isPresent()) {
      return this;
    } else {
      return predicate.apply(this.value) ? this : empty();
    }
  }

  /**
   * If a value is present, returns an {@code Optional} describing (as if by
   * {@link #ofNullable}) the result of applying the given mapping function to
   * the value, otherwise returns an empty {@code Optional}.
   *
   * <p>If the mapping function returns a {@code null} result then this method
   * returns an empty {@code Optional}.
   *
   * @apiNote
   * This method supports post-processing on {@code Optional} values, without
   * the need to explicitly check for a return status.  For example, the
   * following code traverses a stream of URIs, selects one that has not
   * yet been processed, and creates a path from that URI, returning
   * an {@code Optional<Path>}:
   *
   * <pre>{@code
   *     Optional<Path> p =
     *         uris.stream().filter(uri -> !isProcessedYet(uri))
     *                       .findFirst()
     *                       .map(Paths::get);
     * }</pre>
   *
   * Here, {@code findFirst} returns an {@code Optional<URI>}, and then
   * {@code map} returns an {@code Optional<Path>} for the desired
   * URI if one exists.
   *
   * @param mapper the mapping function to apply to a value, if present
   * @param <U> The type of the value returned from the mapping function
   * @return an {@code Optional} describing the result of applying a mapping
   *         function to the value of this {@code Optional}, if a value is
   *         present, otherwise an empty {@code Optional}
   * @throws Error:NullPointerException if the mapping function is {@code null}
   */
  map(mapper) {
    if (true === isnotfunction(mapper)) {
      throw new Error("[NullPointerException]   predicate 'mapper' is not a Function");
    }
    if (false === this.isPresent()) {
      return this.empty();
    } else {
      return Optional.ofNullable(mapper.apply(value));
    }
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
    if (true === isnotfunction(mapper)) {
      throw new Error("[NullPointerException]   predicate 'mapper' is not a Function");
    }

    if (false === isPresent()) {
      return empty();
    } else {
      const flatMapped = mapper.apply(this.value);
      if (true === isnull(flatMapped) || true === isnull(flatMapped.get)) {
        throw new Error("[NullPointerException]   'result' is null");
      }
      return flatMapped;
    }
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
    if (this === optional) {
      return true;
    }
    if (false === (optional instanceof Optional)) {
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
   * @implSpec
   * If a value is present the result must include its string representation
   * in the result.  Empty and present {@code Optional}s must be unambiguously
   * differentiable.
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
