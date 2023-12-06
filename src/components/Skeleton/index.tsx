import { ComponentProps } from "react";
import * as S from "./styles";

type SkeletonProps = ComponentProps<typeof S.SkeletonContainer>;

export function ProductSkeleton({ ...props }: SkeletonProps) {
  return (
    <S.SkeletonContainer {...props}>
      <S.SkeletonItem />
      <div>
        <S.SkeletonItem />
        <S.SkeletonItem />
      </div>
    </S.SkeletonContainer>
  );
}
