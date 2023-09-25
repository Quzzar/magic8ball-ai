import { Box, Button, Center, Stack, Textarea, Title } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { askQuestion } from "./gen-utils";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { resultState } from "./atoms/resultAtoms";
import { Shake } from "./shake";

export default function MainPage() {
  const [state, setState] = useRecoilState(resultState);
  const { ref, width } = useElementSize();
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const [shake] = useState<Shake>(new Shake({ threshold: 20, timeout: 1000 }));
  const shakeCallbackRef = useRef<() => Promise<void>>();
  useEffect(() => {
    if(shake) {
      if(shakeCallbackRef.current) {
        shake.removeEventListener("shake", shakeCallbackRef.current);
      }
      shakeCallbackRef.current = () => ask(value);
      shake.addEventListener("shake", shakeCallbackRef.current);

      // Ask for permission to use vibration
      // TODO: This might ask for permission every time the value changes
      shake.start();
    }
    return () => {
      if(shake) shake.stop();
    }
  }, [shake, value]);

  const ask = async (value: string) => {
    if (value.trim() === "") return;

    setState("LOADING");

    // Start vibration in pattern of animation blur
    window.navigator?.vibrate([1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500]);

    const answer = await askQuestion(value);

    // Turn off vibration
    window.navigator?.vibrate(0);

    setResult(answer);
    setState("ANSWER");
  };

  return (
    <>
      {state === "QUESTION" || state === "LOADING" ? (
        <Box
          sx={{
            position: "absolute",
            left: `calc(50% - ${width / 2 + 20}px)`,
            top: "78%",
          }}
        >
          <Stack spacing={10}>
            <Textarea
              ref={ref}
              placeholder="Ask the AI magic 8 ball a question..."
              variant="filled"
              w={"max(300px, 35vw)"}
              size="lg"
              radius="md"
              autosize
              maxRows={3}
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
              styles={(theme) => ({
                input: {
                  textAlign: "center",
                  color: theme.colors.gray[1],
                  backdropFilter: "blur(4px)",
                  // Add alpha channel to hex color (browser support: https://caniuse.com/css-rrggbbaa)
                  backgroundColor: theme.colors.dark[8] + "50",

                  ":focus": {
                    borderColor: theme.colors.dark[8] + "60",
                  },
                  "::placeholder": {
                    color: theme.colors.gray[5],
                    textAlign: "center",
                  },
                },
              })}
            />
            <Center>
              <Button
                variant="light"
                color="dark"
                radius="md"
                size="xl"
                onClick={() => ask(value)}
                sx={(theme) => ({
                  backdropFilter: "blur(4px)",
                  color: theme.colors.gray[1],
                })}
                compact
              >
                Shake
              </Button>
            </Center>
          </Stack>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Title
              fz="16pt"
              color="#fff"
              ta="center"
              lineClamp={4}
              w={"90pt"}
              h={"110pt"}
              sx={{
                fontFamily: "Grandiflora One, serif",
              }}
            >
              {result}
            </Title>
          </Box>
          <Box
            sx={{
              position: "absolute",
              left: `calc(50% - ${75}px)`,
              top: "85%",
            }}
          >
            <Stack spacing={10}>
              <Center>
                <Button
                  variant="light"
                  color="dark"
                  radius="md"
                  size="xl"
                  onClick={async () => {
                    setValue("");
                    setState("QUESTION");
                  }}
                  sx={(theme) => ({
                    backdropFilter: "blur(4px)",
                    color: theme.colors.gray[1],
                  })}
                  compact
                >
                  Ask again
                </Button>
              </Center>
            </Stack>
          </Box>
        </>
      )}
    </>
  );
}
