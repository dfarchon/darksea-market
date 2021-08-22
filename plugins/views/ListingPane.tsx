import { listStyle, table, textCenter, warning } from "../helpers/styles";
import { artifactIdFromEthersBN } from "@darkforest_eth/serde";
import { useState, useEffect } from "preact/hooks";
import { getLocalArtifact, setLocalArtifact, getRandomActionId, callAction, sortByKey } from "../helpers/helpers";
import { own, notifyManager, MARKET_CONTRACT_ADDRESS } from "../contants";
import { utils, BigNumber } from "ethers";
import { Rarity } from "../components/Rarity";
import { Multiplier } from "../components/Multiplier";
import { Button } from "../components/Button";
import { ArtifactRarity } from "@darkforest_eth/types";
import { h } from "preact";
import {
    EnergyIcon,
    EnergyGrowthIcon,
    DefenseIcon,
    RangeIcon,
    SpeedIcon,
} from '../components/Icon';

function BuyButton({item, contract}) {
    let [processing, setProcessing] = useState(false);
    let [show, setShow] = useState(true);

    function buy() {
        if (!processing) {
            setProcessing(true);
            let action = {
                actionId: getRandomActionId(),
                methodName: 'buy',
            };
            const overrids = {
                value: BigNumber.from(item.price).toString(),
                gasLimit: 5000000,
                gasPrice: undefined,
            };
            callAction(contract, action, [BigNumber.from(item.listId)], overrids).then(()=>{
                setShow(false);
                setProcessing(false);
            }).catch((err) => {
                setProcessing(false);
                console.error(err);
                notifyManager.unsubmittedTxFail(action, err);
            });
        }
    }

    if (show) {
        return <Button onClick={buy} processing={processing} on="Waiting" off="Buy"/>;
    }
}

function UnlistButton({item, contract}) {
    let [processing, setProcessing] = useState(false);
    let [show, setShow] = useState(true);

    function unlist() {
        if (!processing) {
            setProcessing(true);
            let action = {
                actionId: getRandomActionId(),
                methodName: 'unlist',
            };
            callAction(contract, action, [BigNumber.from(item.listId)]).then(()=>{
                setShow(false);
                setProcessing(false);
            }).catch((err) => {
                setProcessing(false);
                console.error(err);
                notifyManager.unsubmittedTxFail(action, err);
            });
        }
    }

    if (show) {
        return <Button onClick={unlist} processing={processing} on="Waiting" off="Unlist"/>;
    }
}

function ListItem({item, contract, artifact}) {
    const artifactId = artifactIdFromEthersBN(item.tokenID);
    const defaultArtifact = {
        id: artifactId,
        artifactType: item.artifactType,
        rarity: ArtifactRarity.Unknown,
        upgrade: {
            energyCapMultiplier: -1,
            energyGroMultiplier: -1,
            defMultiplier: -1,
            rangeMultiplier: -1,
            speedMultiplier: -1
        }
    };
    //@ts-expect-error
    artifact = artifact || df.getArtifactWithId(artifactId) || defaultArtifact;

    return (
        <tr key={artifact.id}>
            <td><Rarity rarity={artifact.rarity} type={artifact.artifactType}/></td>
            <td><Multiplier bonus={artifact.upgrade.energyCapMultiplier} /></td>
            <td><Multiplier bonus={artifact.upgrade.energyGroMultiplier} /></td>
            <td><Multiplier bonus={artifact.upgrade.defMultiplier} /></td>
            <td><Multiplier bonus={artifact.upgrade.rangeMultiplier} /></td>
            <td><Multiplier bonus={artifact.upgrade.speedMultiplier} /></td>
            <td>{`${utils.formatEther(item.price)}xDai`}</td>
            <td>{item.owner.toLowerCase() == own ? 
                <UnlistButton item={item} contract={contract}/>
             : <BuyButton item={item} contract={contract}/>
            }</td>
        </tr>
    );
}

export function ListingPane({selected, artifacts, contract}) {
    if (!selected) {
        return
    }

    const [gameArtifacts, setGameArtifacts] = useState({});
    const fetchMarket = () =>
        console.info("[ArtifactsMarket] Loading artifact detail");
        //@ts-expect-error
        df.contractsAPI
        .getPlayerArtifacts(MARKET_CONTRACT_ADDRESS)
        .then((afs) => {
            let gas = {};
            afs.forEach(a=>gas[a.id]=a);
            setGameArtifacts(gas);
            console.info("[ArtifactsMarket] Loading artifact detail success");
        })
        .catch((err) => {
            console.error("[ArtifactsMarket] Loading artifact detail error");
        });

    useEffect(fetchMarket, []);

    useEffect(() => {
        const poll = setInterval(fetchMarket, 5000);
        return () => clearInterval(poll);
    }, []);

    console.log("[ArtifactsMarket] Building listing");

    let artifactChildren = artifacts.sort(sortByKey('price')).map(item => {
        const artifactId = artifactIdFromEthersBN(item.tokenID);
        return <ListItem item={item} contract={contract} artifact={gameArtifacts[artifactId]}/>;
    });

    console.log("[ArtifactsMarket] Build listing");

    return (
        <div style={listStyle}>
            <div style={textCenter}>
                <span style={warning}>Beware:</span> You will be spending actual xDai here!
            </div>
            {artifactChildren.length ? 
            <table style={table}>
                <tr>
                    <th>Type</th>
                    <th><EnergyIcon/></th>
                    <th><EnergyGrowthIcon/></th>
                    <th><DefenseIcon/></th>
                    <th><RangeIcon/></th>
                    <th><SpeedIcon/></th>
                    <th>Price</th>
                    <th></th>
                </tr>
                {artifactChildren}
            </table> : <div style={textCenter}>No artifacts listing right now.</div>}
        </div>
    );
}