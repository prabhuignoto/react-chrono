import React from "react";
import { hot } from "react-hot-loader/root";
import fontLoader from "webfontloader";
import { Chrono } from "../react-chrono";
import "./App.css";
import {
  ComponentContainer,
  ComponentContainerTree,
  Description,
  DescriptionContent,
  DescriptionHeader,
  Footer,
  Header,
  Horizontal,
  LogoImage,
  Pre,
  URL,
  Vertical,
  Wrapper,
} from "./App.styles";
import data from "./data";
import AppLogo from "./logo.png";

class App extends React.Component<{}, { fontsLoaded: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  componentDidMount() {
    fontLoader.load({
      google: {
        families: ["Roboto Mono:300,400,500"],
      },
      active: () => {
        this.setState({
          fontsLoaded: true,
        });
      },
    });
  }

  render() {
    return (
      <Wrapper show={this.state.fontsLoaded}>
        <>
          <Header>
            <LogoImage src={AppLogo} />
            <a
              href="http://github.com/prabhuignoto/react-chrono"
              target="_new"
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <iframe
                src="https://ghbtns.com/github-btn.html?user=prabhuignoto&repo=react-chrono&type=star&count=true&size=large"
                frameborder="0"
                scrolling="0"
                width="120" 
                height="30"
                title="GitHub"
              ></iframe>
            </a>
          </Header>
          <DescriptionContent>
            <strong>react-chrono</strong> is a modern timeline component built
            for React. The component can be used to layout the events either{" "}
            <em>horizontally</em> or
            <em>vertically</em>. The time line can be easily navigated via the
            control buttons or keyboard.
          </DescriptionContent>

          <br/>

          <Horizontal>
            <Description>
              <DescriptionHeader>Horizontal</DescriptionHeader>
              <DescriptionContent>
                Lasting six years and one day, the Second World War started on 1
                September 1939. Here we trace the timeline of a conflict that
                engulfed the world
              </DescriptionContent>
            </Description>
            <Pre>
              <code className="language-html">
                {'<Chrono items={data} mode="HORIZONTAL" />'}
              </code>
            </Pre>
            <ComponentContainer>
              <Chrono items={data} mode="HORIZONTAL" />
            </ComponentContainer>
          </Horizontal>
          <Vertical>
            <Description>
              <DescriptionHeader>Vertical</DescriptionHeader>
            </Description>
            <Pre>
              <code className="language-html">
                {'<Chrono items={data} mode="VERTICAL" />'}
              </code>
            </Pre>
            <ComponentContainerTree>
              <Chrono items={data} mode="VERTICAL" />
            </ComponentContainerTree>
          </Vertical>
          <Vertical>
            <Description>
              <DescriptionHeader>Tree</DescriptionHeader>
              <DescriptionContent>
                In <strong>TREE</strong> mode, the component will be rendered
                vertically, with cards alternating between left and right.{" "}
                <em>slideShow</em> option works for <strong>Tree</strong> as
                well.
              </DescriptionContent>
            </Description>
            <Pre>
              <code className="language-html">
                {'<Chrono items={data} mode="TREE" />'}
              </code>
            </Pre>
            <ComponentContainerTree>
              <Chrono items={data} mode="TREE" />
            </ComponentContainerTree>
          </Vertical>
          <Horizontal>
            <Description>
              <DescriptionHeader>Slideshow</DescriptionHeader>
              <DescriptionContent>
                The component supports a slideShowMode using which you can auto
                play the timeline. An optional slideItemDuration can be used to
                adjust the exact time duration to wait before displaying the
                next card.
              </DescriptionContent>
            </Description>
            <Pre>
              <code className="language-html">
                {`<Chrono items={data} mode="HORIZONTAL" slideShow slideItemDuration={5000} />`}
              </code>
            </Pre>
            <ComponentContainer>
              <Chrono
                items={data}
                mode="HORIZONTAL"
                slideShow
                slideItemDuration={5000}
              />
            </ComponentContainer>
          </Horizontal>
          <Vertical>
            <Description>
              <DescriptionContent>
                SlideShow is also supported for all the modes. Here is a
                component in TREE mode with slideShow enabled.
              </DescriptionContent>
            </Description>
            <Pre>
              <code className="language-html">
                {
                  '<Chrono items={data} mode="TREE" slideShow slideItemDuration={4000} />'
                }
              </code>
            </Pre>
            <ComponentContainerTree>
              <Chrono
                items={data}
                mode="TREE"
                slideShow
                slideItemDuration={3500}
              />
            </ComponentContainerTree>
          </Vertical>
          <Footer>
            <URL href="https://www.prabhumurthy.com" target="_new">
              www.prabhumurthy.com
            </URL>
          </Footer>
        </>
      </Wrapper>
    );
  }
}

export default hot(App);
