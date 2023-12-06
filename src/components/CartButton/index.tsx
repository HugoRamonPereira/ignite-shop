import { Handbag } from "phosphor-react";
import { ComponentProps } from "react";
import * as S from "./styles";

type CartButtonProps = ComponentProps<typeof S.CartButtonContainer> & {
  quantity?: number;
};

export function CartButton({ quantity = 0, ...rest }: CartButtonProps) {
  return (
    <S.CartButtonContainer {...rest}>
      {quantity > 0 && <span>{quantity}</span>}
      <Handbag weight="bold" />
    </S.CartButtonContainer>
  );
}
