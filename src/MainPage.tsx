import { Box, Button, Center, Stack, Textarea, Title } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { askQuestion, waitDelay } from "./gen-utils";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { resultState } from "./atoms/resultAtoms";
import { Shake } from "./shake";

export default function MainPage() {
  const [state, setState] = useRecoilState(resultState);
  const { ref, width } = useElementSize();
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const shakeRef = useRef<Shake>();
  useEffect(() => {
    const shake = new Shake({ threshold: 1, timeout: 1000 });

    shake.addEventListener("shake", (ev) => {
      alert("Shake!" + ev.detail.timeStamp + "" + ev.detail.acceleration);
    });

    shake.start();

    shakeRef.current = shake;
  }, []);

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
                onClick={async () => {
                  if (value.trim() === "") return;

                  setState("LOADING");

                  try {
                    window.navigator.vibrate([1500, 1500, 1500]);
                  } catch (e) {
                    /**/
                  }

                  const answer = await askQuestion(value);
                  await waitDelay(1000);

                  try {
                    window.navigator.vibrate(0);
                  } catch (e) {
                    /**/
                  }

                  setResult(answer);
                  setState("ANSWER");
                }}
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
              w={"100pt"}
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
