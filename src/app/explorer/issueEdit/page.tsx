"use client";
import Button from "@/components/Button";
import Textfield from "@/components/Textfield";
import { Checkbox, Close, Edit, List, OpenPanelFilledRight, Save, TextBold, TextItalic, TextScale } from "@carbon/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize"; //https://github.com/rehypejs/rehype-sanitize
import remarkGfm from "remark-gfm"; // https://github.com/remarkjs/remark-gfm
import IssueSettings from "./IssueSettings";
import { useGetIssueQuery, useUpdateIssueMutation } from "@/store/api/api";
import { IssueData } from "@/store/types";
import Skeleton from "@/components/Skeleton";
import useMobile from "@/lib/useMobile";
import checkAuth from "@/lib/checkAuth";

function IssueEdit() {
  const searchParams = useSearchParams();
  const { data: issue, isLoading: issueIsLoading } = useGetIssueQuery<
    Record<string, IssueData>
  >(Number(searchParams.get("issueId")));
  const [updateIssue] = useUpdateIssueMutation({
    fixedCacheKey: "shared-update-post",
  });
  const [editIssue, setEditIssue] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [currentName, setName] = useState("");

  const [addTags, setAddTags] = useState(false);
  const mobile = useMobile();
  const [openSettings, setOpenSettings] = useState(mobile ? false : true);

  const router = useRouter();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (mobile) setOpenSettings(false);
    else setOpenSettings(true);
  }, [mobile]);

  useEffect(() => {
    if (!issue) return; // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(issue.name ?? "");
    setMarkdown(issue.markdown ?? "");
  }, [issue]);

  async function handleSave() {
    if (issue) {
      if (issue.name !== currentName) {
        await updateIssue({ id: issue.id, name: currentName });
      }
      if (issue.markdown !== markdown) {
        await updateIssue({ id: issue.id, markdown: markdown });
      }
      setEditIssue(false);
    }
  }
  function insertInTextarea(strBegin: string, strEnd: string) {
    const textarea = textAreaRef.current;
    if (textarea !== null) {

      const newTextarea = textarea.value.slice(0, textarea.selectionStart) + strBegin + textarea.value.slice(textarea.selectionStart, textarea.selectionEnd) + strEnd + textarea.value.slice(textarea.selectionEnd);
      setMarkdown(newTextarea);
      textarea.value = newTextarea;
    }

  }

  if (issueIsLoading) return <Skeleton />;
  return (
    <div className="flex flex-row sm:pl-10 sm:pr-10 pb-0 p-6 relative">
      <div data-opensettings={openSettings} className="sm:data-[opensettings=true]:mr-100 mr-0 flex flex-col w-full">
        <div data-opensettings={openSettings ?? false} className="flex flex-row sm:pt-2 gap-4 w-auto sm:data-[opensettings=true]:pr-8">
          {editIssue ? (
            <Textfield
              label="issueTitle"
              hiddenLabel={true}
              value={currentName}
              setValue={(value: string) => setName(value)}
            />
          ) : (
            <h1 className="text-xl w-full">{issue.name ?? ""}</h1>
          )}

          <div className="flex gap-2 sm:gap-4 h-8 items-center w-fit">
            {editIssue ? (
              <Button
                primary={true}
                size="medium"
                label="Save"
                icon={<Save size="20" className="text-white" />}
                mobileOnlyIcon={true}
                onClick={() => handleSave()}
              />
            ) : (
              <Button
                aria-label="Issue edit"
                primary={true}
                size="medium"
                icon={<Edit size="20" className="text-foreground" />}
                onClick={() => setEditIssue(true)}
              />
            )}

            {
              <div
                data-open={openSettings}
                className="sm:hidden block sm:data-[open=true]:hidden sm:data-[open=false]:block"
              >
                <Button
                  aria-label="Open issue settings"
                  primary={true}
                  size="medium"
                  icon={
                    <OpenPanelFilledRight
                      size="20"
                      className="text-foreground"
                      onClick={() => {
                        setOpenSettings(true);
                      }}
                    />
                  }
                />
              </div>
            }
            <Button
              aria-label="Close issue"
              primary={true}
              size="medium"
              onClick={() => {
                if (editIssue) {
                  setEditIssue(false);
                } else router.back();
              }}
              icon={<Close size="20" className="text-foreground" />}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-4">
              <p>assigned to:</p>
              {issue.assignedTo ? (
                <Button
                  primary={true}
                  label={issue.assignedTo.name ?? ""}
                  size="small"
                />
              ) : (
                <p>none</p>
              )}{" "}
            </div>
            <div className="flex items-center gap-4">
              <p>in project:</p>
              {issue.project ? (
                <Button
                  primary={true}
                  label={issue.project.name}
                  size="small"
                />
              ) : (
                <p>none</p>
              )}
            </div>
          </div>
          <div data-opensettings={openSettings ?? false} className="sm:data-[opensettings=true]:pr-8">
            {editIssue ? (<div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Button primary={false} size="small" label="Bold" mobileOnlyIcon={true} icon={<TextBold size="16" className="foreground" />} onClick={() => insertInTextarea(" **", "** ")} />
                <Button primary={false} size="small" label="Italic" mobileOnlyIcon={true} icon={<TextItalic size="16" className="foreground" />} onClick={() => insertInTextarea(" *", "* ")} />
                <Button primary={false} size="small" label="Title" mobileOnlyIcon={true} icon={<TextScale size="16" className="foreground" />} onClick={() => insertInTextarea(" # ", "")} />
                <Button primary={false} size="small" label="List" mobileOnlyIcon={true} icon={<List size="16" className="foreground" />} onClick={() => insertInTextarea("- ", "")} />
                <Button primary={false} size="small" label="Checkbox" mobileOnlyIcon={true} icon={<Checkbox size="16" className="foreground" />} onClick={() => insertInTextarea("- [ ] ", "")} />
              </div>
              <textarea
                value={markdown}
                ref={textAreaRef}
                onChange={(e) => setMarkdown(e.target.value)}
                className="h-120 md:h-250 w-full shadow-inset dark:shadow-insetDarkmode rounded-sm p-4"
                placeholder="Enter markdown..."
              /></div>
            ) : (
              <div className="w-full min-h-100 h-fit p-5 shadow-inset dark:shadow-insetDarkmode rounded-sm">
                <ReactMarkdown // https://reactmarkdown.com/
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSanitize]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="mb-6 text-3xl font-bold ">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mb-4 text-2xl font-bold pt-5">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-3 text-xl font-semibold  pt-5">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="mb-2 text-lg font-semibold  pt-5">
                        {children}
                      </h4>
                    ),
                    h5: ({ children }) => (
                      <h5 className="mb-2 text-md font-semibold  pt-5">
                        {children}
                      </h5>
                    ),
                    a: ({ href, children }) => (
                      <a href={href} className="text-primaryLight hover:underline">
                        {children}
                      </a>
                    ),
                    code: ({ children }) => (
                      <div className="pt-4 pb-4 p-2">
                        <code className="shadow-inset dark:shadow-insetDarkmode px-4 py-2 rounded">
                          {children}
                        </code>
                      </div>
                    ),
                    li: ({ children, ...props }) => (
                      <li className="pl-2" {...props}>
                        {"• "}
                        {children}
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold">{children}</strong>
                    ),
                    img: ({ src, alt }) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={alt} className="max-w-[100%] h-auto" />
                    ),
                    p: ({ children }) => <p className="mb-4">{children}</p>,
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
      <IssueSettings
        mobile={mobile}
        openSettings={openSettings}
        issue={issue}
        setOpenSettings={setOpenSettings}
        addTags={addTags}
        setAddTags={setAddTags}
      />
    </div>
  );
}
export default checkAuth(IssueEdit);
