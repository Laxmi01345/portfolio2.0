import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { navLinks } from '@config';
import { navDelay } from '@utils';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { Menu } from '@components';


const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 11;
  padding: 0px 30px;
  width: calc(100% - 200px);
  max-width: 800px;
  height: 60px;
  background: rgba(10, 25, 47, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 1080px) {
    padding: 0 25px;
    width: calc(100% - 120px);
  }
  @media (max-width: 768px) {
    padding: 0 20px;
    width: calc(100% - 60px);
    top: 15px;
    height: 55px;
  }

  &:hover {
    background: rgba(10, 25, 47, 0.15);
    border: 1px solid rgba(100, 255, 218, 0.2);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;
`;

const StyledNavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-xs);

      a {
        padding: 10px;

        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: var(--green);
          font-size: var(--fz-xxs);
          text-align: right;
        }
      }
    }
  }
`;

const StyledResumeButton = styled.div`
  position: absolute;
  right: 0;
  
  @media (max-width: 768px) {
    display: none;
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    font-size: var(--fz-xs);
  }
`;

const Nav = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    if (isHome) {
      setIsMounted(true);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeout = isHome ? 2000 : 0;
  const fadeClass = isHome ? 'fade' : '';
  const fadeDownClass = isHome ? 'fadedown' : '';



  const ResumeLink = (
    <a className="resume-button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
      Resume
    </a>
  );

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        {prefersReducedMotion ? (
          <>
            <StyledNavLinks>
              <ol>
                {navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <li key={i}>
                      <Link to={url}>{name}</Link>
                    </li>
                  ))}
              </ol>
            </StyledNavLinks>

            <StyledResumeButton>
              {ResumeLink}
            </StyledResumeButton>

            <Menu />
          </>
        ) : (
          <>
            <StyledNavLinks>
              <ol>
                <TransitionGroup component={null}>
                  {isMounted &&
                    navLinks &&
                    navLinks.map(({ url, name }, i) => (
                      <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                        <li key={i} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                          <Link to={url}>{name}</Link>
                        </li>
                      </CSSTransition>
                    ))}
                </TransitionGroup>
              </ol>
            </StyledNavLinks>

            <StyledResumeButton>
              <TransitionGroup component={null}>
                {isMounted && (
                  <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                    <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                      {ResumeLink}
                    </div>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </StyledResumeButton>

            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <Menu />
                </CSSTransition>
              )}
            </TransitionGroup>
          </>
        )}
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
