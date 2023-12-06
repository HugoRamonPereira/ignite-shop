import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import Image from "next/future/image";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";
import axios from "axios";
import { CartButton } from "../CartButton";
import * as S from "./styles";

export function Cart() {
  const { cartItems, removeCartItem, cartTotal } = useCart();
  const cartQuantity = cartItems.length;

  const formattedCartTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartTotal);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        products: cartItems,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout!");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton quantity={cartQuantity} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <S.CartContent>
          <S.CartClose>
            <X size={24} weight="bold" />
          </S.CartClose>
          <h2>Sacola de compras</h2>

          <section>
            {cartItems.length <= 0 && (
              <p>Parece que seu carrinho está vazio : (</p>
            )}
            {cartItems.map((cartItem) => (
              <S.CartProduct key={cartItem.id}>
                <S.CartProductImage>
                  <Image
                    width={100}
                    height={93}
                    alt=""
                    src={cartItem.imageUrl}
                  />
                </S.CartProductImage>
                <S.CartProductDetails>
                  <p>{cartItem.name}</p>
                  <strong>{cartItem.price}</strong>
                  <button onClick={() => removeCartItem(cartItem.id)}>
                    Remover
                  </button>
                </S.CartProductDetails>
              </S.CartProduct>
            ))}
          </section>

          <S.CartWrapUp>
            <S.WrapUpDetails>
              <div>
                <span>Quantidade</span>
                <p>
                  {cartQuantity} {cartQuantity > 1 ? "itens" : "item"}
                </p>
              </div>
              <div>
                <span>Valor total</span>
                <p>{formattedCartTotal}</p>
              </div>
            </S.WrapUpDetails>
            <button
              onClick={handleCheckout}
              disabled={isCreatingCheckoutSession || cartQuantity <= 0}
            >
              Finalizar compra
            </button>
          </S.CartWrapUp>
        </S.CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
