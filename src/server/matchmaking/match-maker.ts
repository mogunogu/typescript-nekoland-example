// 서버 선언파일 참조
///<reference path="../../../declation/Server.d.ts" />




enum Events {
    STATUS_FINDING_MATCH
}

const DEFAULT_OPTION: MatchMakerOption = {
    min_player: 1,
    max_player: 3,
    loop_time: 5
};

/**
 * 매치메이킹 클래스
 */
class MatchMaker
{
    private players: ServerScript.ScriptUnit[];

    private maxPlayer: number;

    private minPlayer: number;

    private loopTime: number;

    // private eventPrefix: string;
    constructor(options: MatchMakerOption | undefined) {
        if (typeof options === 'undefined') {
            options = DEFAULT_OPTION;
        }
        this.players = [];
        this.maxPlayer = options.max_player;
        this.minPlayer = options.min_player;
        this.loopTime = options.loop_time;
    }

    private sortPlayers(): void {
        this.players.sort();
        if (this.players.length > 0) {
            this.players.filter( unit => {
                return unit.customData.hasOwnProperty(Events.STATUS_FINDING_MATCH);
            });
        }
    }

    private mainLoop(): void {
        try {
            this.sortPlayers();
            if (this.players.length >= this.minPlayer) {
                this.matchPlayers();
            }
            Server.RunLater(() => {
                this.mainLoop();
            }, this.loopTime);
        } catch (error) {
            //
        }
    }

    private matchPlayers(): void {
        //
    }
}





