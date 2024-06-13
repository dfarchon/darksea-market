import {
  Artifact,
  ArtifactRarityNames,
  ArtifactTypeNames,
  BiomeNames,
} from "@dfares/types";
import React from "react";
import styled, { css } from "styled-components";
import dfstyles from "../helpers/dfstyles";
import { artifactFileName } from "../helpers/ArtifactUtils";

export const ARTIFACT_URL = "https://dfares.xyz/public/df_ares_artifact_icons/";

function getArtifactUrl(thumb: boolean, artifact: Artifact): string {
  const fileName = artifactFileName(true, thumb, artifact);
  // return ARTIFACT_URL + fileName;
  const res = ARTIFACT_URL + artifact.artifactType + ".png";
  //todo
  console.log(res);
  return res;
}

export function ArtifactImage({
  artifact,
  size,
  thumb,
}: {
  artifact: Artifact;
  size: number;
  thumb?: boolean;
}) {
  return (
    <Container width={size} height={size}>
      {/* <video width={size} height={size} loop autoPlay key={artifact.id}>
        <source
          src={getArtifactUrl(thumb || false, artifact)}
          type={"video/webm"}
        />
      </video> */}
      <img
        width={size}
        height={size}
        src={ARTIFACT_URL + artifact.artifactType + ".png"}
      />
    </Container>
  );
}

const Container = styled.div`
  image-rendering: crisp-edges;
  ${({ width, height }: { width: number; height: number }) => css`
    width: ${width}px;
    height: ${height}px;
    min-width: ${width}px;
    min-height: ${height}px;
    background-color: ${dfstyles.colors.artifactBackground};
    display: inline-block;
  `}
`;
