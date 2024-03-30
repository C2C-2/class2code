import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import clsx from "clsx";
import classes from "./LightDarkMode.module.css";
function LightDarkMode({ sendDataToParent }) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  sendDataToParent(computedColorScheme);

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="transparent"
      color="gray"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <IconSun className={clsx(classes.icon, classes.light)} stroke={3} />
      <IconMoon className={clsx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
}

export default LightDarkMode;
