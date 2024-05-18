import "./Home.css";
import logo from "../../components/NavBar/logo2 2.png";
import { Button, Card, Divider, Image, Text, Timeline } from "@mantine/core";
import heroImage from "./heroImage.png";
import sec1 from "./sec1.png";
import imgAIChat from "./155Z_2305.w017.n001.52B.p12.52.jpg";
import imgTaskSubSystem from "./istockphoto-1336546162-1024x1024.jpg";
import imgLogo from "./logo2 2.png";
import imgCompanySubSystem from "./20944999.jpg";
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
            <Link to="/Login">
              <Button color="green" w={350}>
                Get Started
              </Button>
            </Link>
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
            <Link to={Paths.Login}>
              <Button color="green" w={350}>
                Start For Free
              </Button>
            </Link>
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
          <Card style={{flex: 1}} shadow="sm" padding="xl" component="a" target="_blank">
            <Card.Section>
              <Image src={imgAIChat} h={160} alt="No way!" />
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
              AI Chat: Your Virtual Project Manager for Real-World Experience
            </Text>

            <Text mt="xs" c="dimmed" size="sm">
              The AI Chat in "Class2Code" assists with projects, answers
              questions, and manages tasks, offering a practical learning
              experience that connects classroom knowledge with real-world
              skills.
            </Text>
          </Card>
          <Card style={{flex: 1}} shadow="sm" padding="xl" component="a" target="_blank">
            <Card.Section>
              <Image src={imgTaskSubSystem} h={160} alt="No way!" />
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
              Task Tracker: Your Personal Project Assistant
            </Text>

            <Text mt="xs" c="dimmed" size="sm">
              Task Tracker: Simplify Project Management Task Tracker in
              Class2Code streamlines teamwork. Assign, track, and communicate
              tasks easily. Simplify your projects with Task Tracker.
            </Text>
          </Card>
          <Card style={{flex: 1}} shadow="sm" padding="xl" component="a" target="_blank">
            <Card.Section>
              <Image src={imgCompanySubSystem} h={160} alt="No way!" />
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
              Class2Code: Bridging Academia with Industry - Revolutionizing
              Education
            </Text>

            <Text mt="xs" c="dimmed" size="sm">
              The company subsystem in "Class2Code" helps students work on real
              projects, fostering practical skills and understanding team
              dynamics.
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
      <footer
        className="footer border p-5 d-flex flex-column gap-4"
        id="footer"
      >
        <div className="d-flex flex-row align-items-center gap-2">
          <img src={imgLogo} alt="Logo" width={50} height={50} />
          <h5 className="">Class2Code</h5>
        </div>
        <div className="footer_sections">
          <div className="footer_sections_our_mission d-flex flex-column gap-3">
            <h5>Our Mission</h5>
            <p>
              We're here to make learning practical and fun. Using artificial
              intelligence, we provide real-life projects for students to work
              on together, preparing them for the world of software development.
            </p>
          </div>
          <div className="d-flex flex-column gap-3">
            <h5>Contact Us</h5>
            <div className="d-flex flex-column align-items-start gap-1">
              <h6>Mohammed Abu Salh</h6>
              <p>Email: abusalhm102@gmail.com</p>
              <p>Phone: 0592455040</p>
            </div>
            <div className="d-flex flex-column align-items-start gap-1">
              <h6>Osama Ghneem</h6>
              <p>Email: ghneem7@gmail.com</p>
              <p>Phone: +972056979817</p>
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <Link to="/Login">
              <Button variant="filled" color="#388E3C" size="md" w={150}>
                Login
              </Button>
            </Link>
            <Link to="/Login">
              <Button variant="filled" color="#388E3C" size="md" w={150}>
                Signup
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
