import React from "react";
import "./Home.css";
import logo from "../../components/NavBar/logo2 2.png";
import { Button, Card, Divider, Image, Text, Timeline } from "@mantine/core";
import heroImage from "./heroImage.png";
import sec1 from "./sec1.png";
import sec2 from "./sec2.png";
import { Link } from "react-router-dom";
import { Paths } from "../../assets/Paths";

const Home = () => {
  return (
    <div>
      <div className="Home_hero">
        <div className="Home_nav">
          <div className="Home_logo">
            <img src={logo} />
            <h5>Class2Code</h5>
          </div>

          <div className="Home_links">
            <a href="/Home">
              <h6>Home</h6>
            </a>

            <a href="/Home#about">
              <h6>About</h6>
            </a>

            <a href="/Home#services">
              <h6>Services</h6>
            </a>

            <a href="/Home#how_it_works">
              <h6>How it works</h6>
            </a>

            <a href="/Home#footer">
              <h6>Contact</h6>
            </a>
          </div>

          <div className="Home_buttons">
            <Link to={Paths.Login}>
              <Button variant="filled" color="orange" radius="xl" size="md">
                Login
              </Button>
            </Link>
            <Link to={Paths.Login}>
              <Button
                variant="filled"
                color="rgba(0, 0, 0, 1)"
                radius="xl"
                size="md"
              >
                Try for Free
              </Button>
            </Link>
          </div>
        </div>
        <div className="Home_hero_first_section"></div>
        <img src={heroImage} />
        <div className="Home_words">
          <h3>Learn</h3>
          <h1>Develop</h1>
          <h2>Collaborate</h2>
          <div>
            <h6>Scroll for more</h6>
          </div>
        </div>
      </div>

      <div className="home_about" id="about">
        <div className="home_about_head">
          <h1>About Class2Code</h1>
          <p>Virtual software company</p>
        </div>

        <div className="home_about_sec1">
          <img src={sec1} alt="" />
          <div className="home_about_sec1_ph">
            <div>
              <p>What is Class2Code?</p>
              <h2>Our Platform</h2>
            </div>
            <p>
              a virtual software company simulation platform for
              students/graduates to gain practical experience.
            </p>
            <Button color="green">Get Started</Button>
          </div>
        </div>
        <div className="home_about_sec1">
          <div className="home_about_sec1_ph">
            <div>
              <p>Why should I use Class2Code?</p>
              <h2>Goals and Benefits</h2>
            </div>
            <p>
              Bridging the academia-industry gap, providing hands-on project
              experience, fostering teamwork and communication skills.
            </p>
            <Button color="green">Start For Free</Button>
          </div>
          <img className="sec2_image" src={sec2} alt="" />
        </div>
      </div>

      <Divider my="md" w={"80%"} mx={"auto"} />
      <br />
      <br />

      <div className="home_services" id="services">
        <div className="home_services_head">
          <h1>Services</h1>
          <p>Our offerings</p>
        </div>

        <div className="home_services_cards">
          <Card
            shadow="sm"
            padding="xl"
            component="a"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
          >
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                h={160}
                alt="No way!"
              />
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
              You&apos;ve won a million dollars in cash!
            </Text>

            <Text mt="xs" c="dimmed" size="sm">
              Please click anywhere on this card to claim your reward, this is
              not a fraud, trust us
            </Text>
          </Card>
          <Card
            shadow="sm"
            padding="xl"
            component="a"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
          >
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                h={160}
                alt="No way!"
              />
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
              You&apos;ve won a million dollars in cash!
            </Text>

            <Text mt="xs" c="dimmed" size="sm">
              Please click anywhere on this card to claim your reward, this is
              not a fraud, trust us
            </Text>
          </Card>
          <Card
            shadow="sm"
            padding="xl"
            component="a"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
          >
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                h={160}
                alt="No way!"
              />
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
              You&apos;ve won a million dollars in cash!
            </Text>

            <Text mt="xs" c="dimmed" size="sm">
              Please click anywhere on this card to claim your reward, this is
              not a fraud, trust us
            </Text>
          </Card>
        </div>
      </div>

      <Divider my="md" w={"80%"} mx={"auto"} />
      <br />
      <br />

      <div className="how_it_works" id="how_it_works">
        <div className="how_it_works_head">
          <h1>How it works</h1>
          <p>Our process</p>
        </div>

        <Timeline
          className="how_it_works_timeline"
          color="green"
          active={1}
          bulletSize={24}
          lineWidth={2}
        >
          <Timeline.Item title="Joining Teams" bullet="1">
            <Text c="dimmed" size="sm">
              Your first step is to create an account and explore the available
              teams within the Class2Code platform. Browse through the posts
              descriptions, project details, and skill requirements to find the
              perfect fit for your interests and expertise. Once you've
              identified a suitable team, apply to join and get ready for an
              exciting collaborative adventure.
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Being Assigned Projects" bullet="2">
            <Text c="dimmed" size="sm">
              After joining a team, you'll be assigned to work on a realistic
              project that closely resembles industry challenges. Attend team
              meetings, review project documentation, and collaborate with your
              teammates to break down the project into manageable tasks and
              milestones. This is where your problem-solving skills and teamwork
              abilities will be put to the test.
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Collaborating with Teammates"
            lineVariant="dashed"
            bullet="3"
          >
            <Text c="dimmed" size="sm">
              Effective communication and collaboration are key to success in
              any software development project. Utilize the platform's
              communication tools, such as chat and messaging, to stay connected
              with your teammates. Share code, documentation, and work artifacts
              seamlessly, and seek feedback or guidance whenever needed. Regular
              team meetings and stand-ups will keep everyone aligned and on
              track.
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Working on Development Tasks" bullet="4">
            <Text c="dimmed" size="sm">
              With your assigned tasks in hand, it's time to roll up your
              sleeves and dive into the development process. Leverage the
              platform's training resources and AI assistance to enhance your
              skills and overcome any challenges you encounter. Conduct code
              reviews, perform testing, and integrate your work with the main
              project codebase, ensuring quality and adherence to industry best
              practices.
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Project Completion and Evaluation" bullet="5">
            <Text c="dimmed" size="sm">
              As your project nears completion, finalize the documentation,
              conduct final testing, and prepare for deployment. Present your
              work to public and your teachers to receive feedback from your
              teammates.
            </Text>
          </Timeline.Item>
        </Timeline>
      </div>

      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <>
      <footer className="footer bg-dark text-light p-5 pb-0 mt-5" id="footer">
        <div className="container">
          <div className="info row">
            <div className="col-md-3">
              <h5 className="mb-3">Our Mission</h5>
              <p>
                University Device Registration and Reservation System is a
                Catholic co-educational institution in the Lasallian tradition
                whose mission is to provide quality higher education to the
                people of Palestine and to serve them in its role as a center
                for the advancement, sharing, and use of knowledge.
              </p>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3">
              <h5 className="mb-3">Contact Us</h5>
              <p className="mb-2">Email: info@bethlehem.edu</p>
              <p className="mb-2">Phone: +970-2-274-1241/2/3/4/5/6</p>
              <p>Address: 5 Rue des Frères Bethlehem, Palestine</p>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3">
              <h5 className="mb-3">Follow Us</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-light">
                    Facebook
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className="text-center">
                &copy; {new Date().getFullYear()} University Device Registration
                and Reservation System
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
