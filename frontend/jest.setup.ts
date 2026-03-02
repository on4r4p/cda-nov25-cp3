import "@testing-library/jest-dom";

jest.mock("next/image", () => {
  const React = require("react");

  return {
    __esModule: true,
    default: ({ alt = "", fill: _fill, priority: _priority, ...props }: Record<string, unknown>) =>
      React.createElement("img", { alt, ...props }),
  };
});

jest.mock("next/link", () => {
  const React = require("react");

  return {
    __esModule: true,
    default: ({
      children,
      href,
      ...props
    }: {
      children: unknown;
      href: string | { pathname?: string };
    }) =>
      React.createElement(
        "a",
        {
          href: typeof href === "string" ? href : (href.pathname ?? ""),
          ...props,
        },
        children,
      ),
  };
});
