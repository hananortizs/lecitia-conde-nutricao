import styled, { css } from "styled-components";
import type { Theme } from "../../types";

interface ContainerProps {
  $fluid?: boolean;
  $maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  $padding?: "none" | "sm" | "md" | "lg" | "xl";
  $centered?: boolean;
}

const getMaxWidth = (maxWidth: string, theme: Theme) => {
  switch (maxWidth) {
    case "sm":
      return "40rem"; // 640px
    case "md":
      return "48rem"; // 768px
    case "lg":
      return "64rem"; // 1024px
    case "xl":
      return "80rem"; // 1280px
    case "2xl":
      return "96rem"; // 1536px
    case "full":
      return "100%";
    default:
      return "80rem"; // 1280px
  }
};

const getPadding = (padding: string, theme: Theme) => {
  switch (padding) {
    case "none":
      return "0";
    case "sm":
      return theme.fluid.spacing.sm;
    case "md":
      return theme.fluid.spacing.md;
    case "lg":
      return theme.fluid.spacing.lg;
    case "xl":
      return theme.fluid.spacing.xl;
    default:
      return theme.fluid.spacing.md;
  }
};

export const Container = styled.div<ContainerProps>`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${(props) => getPadding(props.$padding || "md", props.theme)};
  box-sizing: border-box;

  ${(props) =>
    !props.$fluid &&
    css`
      max-width: ${getMaxWidth(props.$maxWidth || "xl", props.theme)};
    `}

  ${(props) =>
    props.$centered &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `}

  /* Responsive padding */
  ${({ theme }) => theme.mq.up("sm")} {
    padding: 0 ${(props) => getPadding(props.$padding || "md", props.theme)};
  }

  ${({ theme }) => theme.mq.up("lg")} {
    padding: 0 ${(props) => getPadding(props.$padding || "lg", props.theme)};
  }

  ${({ theme }) => theme.mq.up("xl")} {
    padding: 0 ${(props) => getPadding(props.$padding || "xl", props.theme)};
  }
`;

// Container para seções que ocupam toda a largura
export const FullWidthContainer = styled.div`
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow-x: hidden;
`;

// Container para conteúdo que precisa de mais espaço
export const WideContainer = styled(Container)`
  max-width: 100rem; // 1600px
`;

// Container para conteúdo compacto
export const CompactContainer = styled(Container)`
  max-width: 60rem; // 960px
`;

// Container para conteúdo estreito (artigos, formulários)
export const NarrowContainer = styled(Container)`
  max-width: 45rem; // 720px
`;
