import { Component, OnInit } from '@angular/core';
import { MonstersService } from '../services/monsters.service'
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    players: any[] = []
    songs: any[] = []
    storedMonsters: any[] = []
    activeMonster: any
    files: any[] = []
    lastSong: any
    searchList: any[] = []
    bestiary: any[] = []
    tags: string[] = []
    addingtag: boolean = false
    addingplayer: boolean = false
    watchingPlayers:boolean = false

    statIndex:number = 0

    constructor(private ms: MonstersService) {
        
    }

    ngOnInit() {
        this.reloadDB()

        this.activeMonster = {
            name: 'Aboleth',
            searchName: 'aboleth',
            size: 'Large',
            type: 'aberration',
            alignment: 'Lawful evil',
            img: "",
            ac: 17,
            hp: 135,
            speed: '10 ft., swim 40 ft.',
            str: 21,
            dex: 9,
            con: 15,
            int: 18,
            wis: 15,
            cha: 10,
            features: [],
            actions: [],
            savingThrows: [
                "Wis +9",
                "Cha +9"
            ],
            skills: [
                "Insight +7",
                "Perception +9"
            ],
            resistances: '',
            conImmunities: '',
            dmgImmunities: '',
            senses: '',
            languages: '',
            cr: 10
        }
        /*this.activeMonster = {
            img: "https://vignette.wikia.nocookie.net/forgottenrealms/images/1/12/Deva-5e.jpg/revision/latest/scale-to-width-down/350?cb=20161119153420",
            savingThrows: [
                "Wis +9",
                "Cha +9"
            ],
            skills: [
                "Insight +7",
                "Perception +9"
        }*/

        this.tags.push("Passive Perception")
        this.tags.push("Initiative")
        this.players.push({ name: 'Germán', features: [17, 2] })
        this.players.push({ name: 'Carlos', features: [12, 17] })
        this.players.push({ name: 'Adrián', features: [15, 3] })
        this.players.push({ name: 'Sebastián', features: [9, 18] })

    }

    seeSong(event) {
        let input = document.getElementById('songUploader') as HTMLInputElement
        input.src = URL.createObjectURL(event.target.files[0])
        console.log(event.target.files[0].name)
        this.lastSong = {
            name: event.target.files[0].name,
            file: event.target.files[0]
        }
    }

    addSong() {
        this.songs.push(this.lastSong.name)
        this.files.push(this.lastSong.file)
    }

    playSong(song) {
        let reader = new FileReader()
        let sound = document.getElementById('sound') as HTMLAudioElement
        reader.onload = (e) => {
            sound.src = URL.createObjectURL(this.files[this.songs.indexOf(song)])
            sound.controls = true
            sound.play()
        }
        reader.readAsDataURL(this.files[this.songs.indexOf(song)])
    }

    removeMonster(monster) {
        this.storedMonsters.splice(this.storedMonsters.indexOf(monster), 1)
    }

    addMonster(monster) {
        this.storedMonsters.push(monster)
    }

    setActive(monster) {
        this.activeMonster = monster
    }

    searchMonster(event) {
        let name = event.target.value.toLowerCase()
        this.searchList = []
        for (let i of this.bestiary) {
            if (i.searchName.search(name) != -1) {
                this.searchList.push(i)
            }
        }
    }

    selectFromSearchList(i) {
        this.activeMonster = i
        this.searchList = []
    }

    reloadDB() {
        for (let i = 1; i <= 325; i++) {
            this.ms.search(i).subscribe(res => {
                let response = res as any
                
                let monster = {
                    name: response.name,
                    searchName: response.name.toLowerCase(),
                    size: response.size,
                    type: response.type,
                    alignment: response.alignment.charAt(0).toUpperCase() + response.alignment.slice(1),
                    img: "",
                    ac: response.armor_class,
                    hp: response.hit_points,
                    speed: response.speed,
                    str: response.strength,
                    dex: response.dexterity,
                    con: response.constitution,
                    int: response.intelligence,
                    wis: response.wisdom,
                    cha: response.charisma,
                    features: response.special_abilities,
                    actions: response.actions,
                    savingThrows: [
                        "Wis +9",
                        "Cha +9"
                    ],
                    skills: [
                        "Insight +7",
                        "Perception +9"
                    ],
                    resistances: response.damage_resistances,
                    conImmunities: response.condition_immunities,
                    dmgImmunities: response.damage_immunities,
                    senses: response.senses,
                    languages: response.languages,
                    cr: response.challenge_rating
                }
                if (i == 1) this.activeMonster = monster
                this.bestiary.push(monster)
            })
        }
    }
}