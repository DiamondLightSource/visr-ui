import type { WorkflowArtifact } from "../../hooks/useWorkflowArtifacts";


export function ProcessedSpectroscopyData(props: { workflowArtifacts: WorkflowArtifact[] }) {
  const imageUrls = props.workflowArtifacts
    .filter(it => it.mimeType === "image/png")
    .map(it => it.url);
  console.log("DEBUG: workflowArtifacts", imageUrls)
  return (
    <div>
      {imageUrls.map((url, i) => (
        <div key={i}>
        <p>Workflow Result: {i} : {url}</p>
        <img
          src={url}
          alt={`Processing Spectroscopy image ${i}`}
          style={{ maxWidth: "100%", display: "block", marginBottom: "1rem" }}
        />
        </div>
      ))}
    </div>
  );
}


export default ProcessedSpectroscopyData;
