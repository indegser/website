import { render } from "@testing-library/react";
import Story from "apps/story/Story";

describe("story", () => {
  it("renders markdown", () => {
    const story: IStory = {
      id: "1",
      data: {
        title: "Hello World1",
      },
      slug: "hello-world",
      createdAt: Date.now(),
      modifiedAt: Date.now(),
      content: `# Hello`,
    };
    const { container } = render(<Story story={story} />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="css-twjud5"
        >
          <div
            class="css-mr8s8b"
          >
            <div
              class="css-d5vt42"
            >
              <h1
                class="css-1mb6fbx"
              >
                Hello World1
              </h1>
              <h3
                class="css-1dey5ms"
              />
            </div>
            <div
              class="css-1nmf62u"
            >
              <div
                style="max-height: 0;"
              >
                <div>
                  <ol>
                    <li>
                      <span
                        class="css-ffoxqm"
                      >
                        <a
                          href="#hello"
                        >
                          Hello
                          <span
                            class="css-bcryca"
                          >
                            <span
                              class="css-102nk7r"
                            />
                          </span>
                        </a>
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
              <div
                class="css-13nmtcc"
              >
                <div
                  class="css-10ncpu"
                >
                  Table of Contents
                </div>
                <span
                  class="css-102nk7r"
                />
              </div>
            </div>
            <div
              class="css-igfvq5"
            >
              <div
                id="hello"
              >
                <h1>
                  Hello
                </h1>
              </div>
            </div>
            <div
              class="css-pqunsr"
            >
              <div
                class="css-1xb6yvq"
              >
                Footnote
              </div>
              <div
                id="footnotes"
              />
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
