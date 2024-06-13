import { ArtifactRarityTypeLabelAnim } from "../components/labels/ArtifactLabels";
import {
  ArtifactDetail,
  UpgradeStatMultiplierInfo,
} from "../components/ArtifactDetail";
import { listStyle, table, textCenter, warning } from "../helpers/styles";
import { Btn } from "../components/Btn";
import { sortByKey } from "../helpers/helpers";
import React, { useState, useEffect } from "react";
import { useMyArtifactsList } from "../helpers/AppHooks";
import { SortableHeader } from "../components/SortableHeader";
import { Beware } from "../components/Beware";
import { ArtifactType } from "@dfares/types";
import { Multiplier } from "../components/Multiplier";

const defaultSort = [{ key: "rarity", d: -1 }];

export function InventoryPane() {
  const [active, setActive] = useState(undefined);
  const [sort, setSort] = useState(defaultSort);
  const my_artifacts = useMyArtifactsList();

  useEffect(() => {
    return () => {
      setActive(undefined);
      setSort(defaultSort);
    };
  }, []);

  let artifactChildren = my_artifacts
    .filter((artifact) => {
      return artifact.artifactType <= 16 && !artifact.onPlanetId;
    })
    .sort(sortByKey(sort))
    .map((artifact) => {
      const rows = [
        <tr key={artifact.id} style={table}>
          <td>
            <ArtifactRarityTypeLabelAnim artifact={artifact} isOffer={false} />
          </td>

          <td>
            <Multiplier
              mult={
                (artifact.upgrade.energyCapMultiplier *
                  artifact.timeDelayedUpgrade.energyCapMultiplier) /
                100
              }
            />
          </td>
          <td>
            <Multiplier
              mult={
                (artifact.upgrade.energyGroMultiplier *
                  artifact.timeDelayedUpgrade.energyGroMultiplier) /
                100
              }
            />
          </td>
          <td>
            <Multiplier
              mult={
                (artifact.upgrade.rangeMultiplier *
                  artifact.timeDelayedUpgrade.rangeMultiplier) /
                100
              }
            />
          </td>
          <td>
            <Multiplier
              mult={
                (artifact.upgrade.speedMultiplier *
                  artifact.timeDelayedUpgrade.speedMultiplier) /
                100
              }
            />
          </td>
          <td>
            <Multiplier
              mult={
                (artifact.upgrade.defMultiplier *
                  artifact.timeDelayedUpgrade.defMultiplier) /
                100
              }
            />
          </td>
          <td>
            <Btn onClick={() => setActive(artifact)}>View</Btn>
          </td>
        </tr>,
      ];
      if (active && active.id == artifact.id) {
        rows.push(
          <tr key={artifact.id + "a"}>
            <td colSpan="7">
              <ArtifactDetail
                artifact={artifact}
                onCancel={() => setActive(false)}
                offer={false}
              />
            </td>
          </tr>,
        );
      }
      return rows;
    });

  return (
    <div style={listStyle}>
      <Beware />
      {artifactChildren.length ? (
        <table style={table}>
          <SortableHeader
            sort={sort}
            setSort={setSort}
            defaultSort={defaultSort}
            withPrice={false}
          />
          <tbody>{artifactChildren}</tbody>
        </table>
      ) : (
        <div style={textCenter}>
          No artifacts right now. <br />
          You need withdraw your artifacts from a Spacetime Rip first.
        </div>
      )}
    </div>
  );
}
