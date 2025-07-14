import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import type { ThemeType } from "@/styles/theme";

const Header = styled.header<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 1rem 2rem;
  position: relative;
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.neonOrange},
      transparent
    );
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const LogoImage = styled.div``;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.creamyBeige};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.neonOrange};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.neonOrange};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const HeaderComponent: React.FC = () => {
  return (
    <Header>
      <HeaderContainer>
        <Logo href="/">
          <LogoImage>
            <Image
              src="/images/thebarefoot.dev-logo.png"
              alt="Barefoot Dev Logo"
              width={44}
              height={44}
            />
          </LogoImage>
        </Logo>
        <Navigation>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/about">About</NavLink>
        </Navigation>
      </HeaderContainer>
    </Header>
  );
};

export default HeaderComponent; 