import * as R from 'ramda'

import { getClassList, setClassList } from '../utils/classList'
import { getElementById } from '../utils/getElementById'
import { updateByValue } from '../utils/updateByValue'
import Component from './Component'
import { State } from '../store/types'

class Drawer extends Component {
  private static readonly id = 'drawer'
  private static openClass = 'open'
  private static closedClass = 'closed'

  private open: boolean

  public constructor () {
    super()
    this.open = false
  }

  public toggle = () => {
  }

  public setOpen = () => {
  }

  public setClosed = () => {
  }

  protected onStateChange (state: State) {

  }

  private getRoot (): HTMLElement {
    return getElementById(Drawer.id)
  }
}

export default new Drawer()
