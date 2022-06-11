pub trait Point {
    fn get(&self, dimension: usize) -> f32;
}

pub struct KdTree<T: Point> {
    head: Link<T>,
}

struct Node<T: Point> {
    val: T,
    left: Link<T>,
    right: Link<T>,
}

impl<T: Point> Node<T> {
    fn from(val: T) -> Self {
        Self {
            val,
            left: None,
            right: None,
        }
    }
}

type Link<T> = Option<Box<Node<T>>>;

impl<T: Point> KdTree<T> {
    pub fn new() -> Self {
        Self { head: None }
    }

    pub fn insert(&mut self, new: T) {
        let mut depth = 0;
        let mut link = &mut self.head;
        {
            while let Some(current) = link.as_mut() {
                if new.get(depth % 2) > current.val.get(depth % 2) {
                    link = &mut current.right;
                } else {
                    link = &mut current.left;
                }
                depth += 1;
            }
        }
        *link = Some(Box::new(Node::from(new)));
    }
}
